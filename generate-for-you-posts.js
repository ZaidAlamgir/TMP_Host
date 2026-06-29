// This script fetches top posts from Supabase and pushes them as Markdown files to another GitHub repo.

import { createClient } from '@supabase/supabase-js';
import simpleGit from 'simple-git';
import { rm, mkdir } from 'fs/promises';
import path from 'path';

// --- REVISED: Use SSH URL for Deploy Key authentication ---
const REPO_URL = `git@github.com:${process.env.TARGET_REPO_OWNER}/${process.env.TARGET_REPO_NAME}.git`;
const CLONE_DIR = './for-you-repo-clone';
const POSTS_DIR = path.join(CLONE_DIR, '_posts');

// --- Main Function ---
async function main() {
    console.log('Starting "For You" feed generation...');

    // 1. Connect to Supabase
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

    // 2. Fetch top 20 posts (ordered by likes, then views)
    console.log('Fetching top posts from Supabase...');
    const { data: posts, error: fetchError } = await supabase
        .from('posts')
        .select('id, created_at, content, author_name, author_qual, tags, like_count, view_count')
        .order('like_count', { ascending: false })
        .order('view_count', { ascending: false })
        .limit(20);

    if (fetchError) {
        throw new Error(`Supabase fetch error: ${fetchError.message}`);
    }
    console.log(`Fetched ${posts.length} posts.`);
    
    // 3. Set up Git with SSH and clone the target repository
    console.log(`Cloning ${process.env.TARGET_REPO_OWNER}/${process.env.TARGET_REPO_NAME}...`);
    await rm(CLONE_DIR, { recursive: true, force: true });

    const git = simpleGit({
        config: [
            `core.sshCommand=ssh -i /dev/stdin -o IdentitiesOnly=yes -o StrictHostKeyChecking=no`
        ]
    }).env({...process.env, GIT_SSH_COMMAND_INPUT: process.env.FOR_YOU_DEPLOY_KEY });
    await git.clone(REPO_URL, CLONE_DIR);
    
    // Move into the cloned directory and configure the git user for the commit
    await git.cwd(CLONE_DIR);
    await git.addConfig('user.name', 'GitHub Actions Bot');
    await git.addConfig('user.email', 'actions-bot@github.com');

    // 4. Clear old posts and create new ones
    console.log('Clearing old posts and generating new files...');
    await rm(POSTS_DIR, { recursive: true, force: true });
    await mkdir(POSTS_DIR, { recursive: true });

    for (const post of posts) {
        const date = new Date(post.created_at);
        const dateString = date.toISOString().split('T')[0];
        const fileName = `${dateString}-post-${post.id}.md`;
        const filePath = path.join(POSTS_DIR, fileName);

        // Create Jekyll Frontmatter
        let fileContent = '---\n';
        fileContent += `layout: post\n`;
        fileContent += `title: "${(post.content.split('\n')[0] || 'Post').replace(/"/g, '\\"')}"\n`;
        fileContent += `date: ${date.toISOString()}\n`;
        fileContent += `author_name: "${post.author_name || 'Writer'}"\n`;
        fileContent += `author_qual: "${post.author_qual || 'Contributor'}"\n`;
        if (post.tags && post.tags.length > 0) {
            fileContent += `tags: [${post.tags.join(', ')}]\n`;
        }
        fileContent += '---\n\n';
        fileContent += post.content;

        await import('write-file-atomic').then(m => m.default(filePath, fileContent));
    }
    console.log('Generated new post files.');

    // 5. Commit and push changes
    console.log('Committing and pushing changes to target repository...');
    await git.add('.');
    const status = await git.status();
    
    if (status.files.length > 0) {
        await git.commit(`feat: Update "For You" feed for ${new Date().toISOString()}`);
        await git.push('origin', 'main');
        console.log('Successfully pushed updates.');
    } else {
        console.log('No changes to commit.');
    }

    console.log('"For You" feed generation complete!');
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});
