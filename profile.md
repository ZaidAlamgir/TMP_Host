---
layout: authenticated
title: My Account - The Muslim Post
---
<style>
    /* --- Styles for "My Posts" list --- */
    .user-post-item {
        background-color: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1rem;
    }
    .user-post-item .post-content {
        color: #374151;
        line-height: 1.6;
        margin-bottom: 1rem;
    }
    .user-post-item .post-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.85rem;
        color: #6b7280;
    }
    .user-post-item .post-actions button {
        background: none; border: none; font-size: 1rem; color: #6b7280; cursor: pointer; padding: 5px; border-radius: 50%; width: 32px; height: 32px; transition: background-color 0.2s, color 0.2s;
    }
    .user-post-item .post-actions button:hover { background-color: #e5e7eb; color: #1f2937; }

    /* --- NEW: Styles for the Edit Form Actions --- */
    .post-edit-container .dynamic-block { border: 1px solid #e5e7eb; border-radius: 0.75rem; padding: 1rem; margin-top: 1rem; background-color: #fff; position: relative; }
    .post-edit-container .dynamic-block h3 { font-size: 0.8rem; font-weight: 600; color: #4b5563; margin-bottom: 0.75rem; text-transform: uppercase; }
    .post-edit-container .dynamic-block textarea, .post-edit-container .dynamic-block input { width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 15px; box-sizing: border-box; }
    .post-edit-container .dynamic-block textarea:focus, .post-edit-container .dynamic-block input:focus { border-color: #0073e6; box-shadow: 0 0 0 2px rgba(0, 115, 230, 0.2); outline: none; }
    .post-edit-container .dynamic-block input.headline-input { font-size: 1.25rem; font-weight: bold; }
    .post-edit-container .edit-actions-container { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1rem; }
    .post-edit-container .btn-cancel { background: #eee; padding: 8px 12px; border-radius: 6px; font-weight: 600; border: none; cursor: pointer; }
    .post-edit-container .btn-save { background: #0073e6; color: white; padding: 8px 12px; border-radius: 6px; font-weight: 600; border: none; cursor: pointer; }


    .edit-actions-container {
        display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.5rem;
    }
</style>
<div class="profile-container-wrapper">
    <div class="profile-layout">
        <nav class="profile-nav">
            <h3 id="welcome-name">Welcome</h3> <!-- CRITICAL FIX: This ID was missing -->
            <ul>
                <li><a href="#" class="nav-link active" data-view="profile-view" title="Profile"><i class="fas fa-user fa-fw"></i> <span>Profile</span></a></li>
                <li><a href="#" class="nav-link" data-view="my-posts-view" title="My Posts"><i class="fas fa-newspaper fa-fw"></i> <span>My Posts</span></a></li>
                <li><a href="#" class="nav-link" data-view="security-view" title="Security"><i class="fas fa-shield-alt fa-fw"></i> <span>Security</span></a></li>
                <li><a href="#" id="sign-out-btn" title="Sign Out"><i class="fas fa-sign-out-alt fa-fw"></i> <span>Sign Out</span></a></li>
            </ul>
        </nav>
        <main class="profile-content">
            <div id="profile-view" class="profile-view active">
                <h2>My Profile</h2>
                <form id="profileForm">
                    <div class="form-group"><label for="fullName">Full Name</label><input type="text" id="fullName" name="fullName"></div>
                    <div class="form-group"><label for="email">Email Address</label><input type="email" id="email" name="email" disabled></div>
                    <button type="submit" class="btn-primary">Update Name</button>
                    <div id="profileMessage" class="message"></div>
                </form>
            </div>
            <div id="security-view" class="profile-view">
                <h2>Security Settings</h2>
                <div class="form-group">
                    <label>Password</label>
                    <p style="font-size: 0.9rem; color: #606770; margin: 0;">Click the button below to send a password reset link to your email.</p>
                </div>
                <button id="resetPasswordBtn" class="btn-primary">Send Password Reset Email</button>
                <div id="securityMessage" class="message"></div>
            </div>
            <div id="my-posts-view" class="profile-view">
                <h2>My Posts</h2>
                <div id="my-posts-list">
                    <!-- User's posts will be dynamically inserted here -->
                </div>
            </div>
        </main>
    </div>
</div>

<script>
    // --- SUPABASE CONFIGURATION ---
    const SUPABASE_URL = 'https://yfrqnghduttudqbnodwr.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcnFuZ2hkdXR0dWRxYm5vZHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NDc3MTgsImV4cCI6MjA3NDEyMzcxOH0.i7JCX74CnE7pvZnBpCbuz6ajmSgIlA9Mx0FhlPJjzxU'; // <-- PASTE YOUR NEW KEY HERE

    // CRITICAL FIX: Wrap the entire logic in DOMContentLoaded.
    // This ensures that all scripts from the layout (firebase-init.js, supabase.js)
    // are loaded and ready before this script attempts to use them, preventing a race condition.
    document.addEventListener('DOMContentLoaded', () => {
        const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        const basePath = document.body.getAttribute('data-base-path') || '';

        // --- FIX: Add a guard to prevent re-initialization ---
        let isProfileInitialized = false;

        // AUTH GUARD: Use Supabase's onAuthStateChange to react to login/logout events.
        supabase.auth.onAuthStateChange((event, session) => {
            const user = session?.user;
            if (user) {
                // CRITICAL FIX: After a login redirect, the header might have rendered from an old cache.
                // We explicitly call the header rendering function again with the correct, fresh user data
                // to ensure the profile icon appears instantly without needing a manual refresh.
                if (typeof initializeSupabaseHeader === 'function') {
                    initializeSupabaseHeader(basePath, true); // This now becomes the one and only call on this page.
                }
                if (!isProfileInitialized) {
                    initializeProfilePage(user, supabase, basePath);
                    isProfileInitialized = true;
                }
                document.querySelector('.profile-container-wrapper').style.display = 'block'; // Ensure it's displayed
            } else {
                window.location.href = `${basePath}/auth.html`;
            }
        });

        function initializeProfilePage(user, supabase, basePath) {
            const welcomeName = document.getElementById('welcome-name');
            const fullNameInput = document.getElementById('fullName');
            const emailInput = document.getElementById('email');
            const profileForm = document.getElementById('profileForm');
            const resetPasswordBtn = document.getElementById('resetPasswordBtn');
            const signOutBtn = document.getElementById('sign-out-btn');
            const profileMessage = document.getElementById('profileMessage');
            const securityMessage = document.getElementById('securityMessage');
            const navLinks = document.querySelectorAll('.nav-link');
            const views = document.querySelectorAll('.profile-view');

            // Use Supabase user object structure
            const currentName = user.user_metadata.full_name || user.email;
            welcomeName.textContent = `Welcome, ${currentName}`;
            fullNameInput.value = user.user_metadata.full_name || '';
            emailInput.value = user.email || '';

            navLinks.forEach(link => link.addEventListener('click', (e) => {
                e.preventDefault();
                if (link.id === 'sign-out-btn') return;
                const targetViewId = link.getAttribute('data-view');

                // If the user clicks the "My Posts" tab, reload the posts.
                if (targetViewId === 'my-posts-view') {
                    loadUserPosts(user, supabase);
                }

                views.forEach(view => view.classList.remove('active'));
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                const targetView = document.getElementById(targetViewId);
                targetView.classList.add('active');
                link.classList.add('active');
            }));

            // --- Add event listener for delete/edit buttons on the posts list ---
            const myPostsList = document.getElementById('my-posts-list');
            myPostsList.addEventListener('click', async (e) => {
                const target = e.target; // The element that was clicked
                const postItem = target.closest('.user-post-item');
                if (!postItem) return;

                const postId = postItem.dataset.postId;

                // --- DELETE LOGIC ---
                if (target.closest('.btn-delete')) {
                    if (!postId) return;
                    if (confirm('Are you sure you want to permanently delete this post?')) {
                        const { error } = await supabase.from('posts').delete().eq('id', postId);
                        if (error) {
                            alert(`Error deleting post: ${error.message}`);
                        } else {
                            postItem.style.transition = 'opacity 0.3s ease';
                            postItem.style.opacity = '0';
                            setTimeout(() => postItem.remove(), 300);
                        }
                    }
                }
                // --- EDIT LOGIC ---
                else if (target.closest('.btn-edit')) {
                    const contentDisplay = postItem.querySelector('.post-content-display');
                    if (postItem.querySelector('.post-edit-container')) return; // Already open

                    const originalContentHTML = contentDisplay.querySelector('.post-content').innerHTML;
                    
                    // Create the edit container dynamically
                    const editContainer = postItem.querySelector('.post-edit-container');
                    let formHTML = '';
                    
                    // Deconstruct the rendered HTML into an editable form
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = originalContentHTML;
                    Array.from(tempDiv.children).forEach(node => {
                        const type = node.tagName.toLowerCase();
                        if (type === 'p') formHTML += `<div class="dynamic-block" data-block-type="paragraph"><h3>Paragraph</h3><textarea rows="5">${node.textContent}</textarea></div>`;
                        else if (type === 'blockquote') formHTML += `<div class="dynamic-block" data-block-type="quote"><h3>Quote</h3><textarea rows="3">${node.textContent}</textarea></div>`;
                        else if (type === 'h3') formHTML += `<div class="dynamic-block" data-block-type="headline"><h3>Headline</h3><input type="text" class="headline-input" value="${node.textContent}"></div>`;
                        else if (type === 'img') formHTML += `<div class="dynamic-block" data-block-type="image"><h3>Image URL</h3><input type="text" value="${node.src}"></div>`;
                    });

                    editContainer.innerHTML = `${formHTML}
                        <div class="edit-actions-container">
                            <button class="btn-cancel">Cancel</button>
                            <button class="btn-save">Save</button>
                        </div>`;

                    contentDisplay.style.display = 'none';
                    editContainer.style.display = 'block';
                }
                // --- SAVE LOGIC ---
                else if (target.closest('.btn-save')) {
                    const contentDisplay = postItem.querySelector('.post-content-display');
                    const editContainer = postItem.querySelector('.post-edit-container');

                    // Rebuild content from the multi-part form
                    const newContent = Array.from(editContainer.querySelectorAll('.dynamic-block')).map(block => {
                        const type = block.dataset.blockType;
                        const value = block.querySelector('input, textarea').value.trim();
                        if (type === 'image') return `!Image`;
                        if (type === 'quote') return `> ${value}`;
                        if (type === 'headline') return `## ${value}`;
                        return value;
                    }).filter(v => v).join('\n\n');

                    const { error } = await supabase.from('posts').update({ content: newContent }).eq('id', postId);

                    if (error) {
                        alert(`Error updating post: ${error.message}`);
                    } else {
                        // Easiest way to show updated content is to reload the list
                        loadUserPosts(user, supabase);
                    }
                }
                // --- CANCEL LOGIC ---
                else if (target.closest('.btn-cancel')) {
                    const contentDisplay = postItem.querySelector('.post-content-display');
                    const editContainer = postItem.querySelector('.post-edit-container');
                    
                    // Just switch views without saving
                    editContainer.style.display = 'none';
                    contentDisplay.style.display = 'block';
                }
            });

            async function loadUserPosts(user, supabase) {
                const postsList = document.getElementById('my-posts-list');
                postsList.innerHTML = '<div class="loader"></div>'; // Show a loader

                const { data: posts, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) {
                    postsList.innerHTML = `<div class="message error">Could not load your posts.</div>`;
                    return;
                }

                if (posts.length === 0) {
                    postsList.innerHTML = `<p>You haven't created any posts yet.</p>`;
                    return;
                }

                postsList.innerHTML = posts.map(post => {
                    // Parse the markdown content to render it correctly
                    let contentHTML = '';
                    if (post.content) {
                        post.content.split('\n\n').forEach(part => {
                            const trimmedPart = part.trim();
                            if (trimmedPart.startsWith('![')) {
                                const url = trimmedPart.match(/\((.*?)\)/)?.[1];
                                if (url) contentHTML += `<img src="${url}" style="max-width: 100%; border-radius: 8px; margin: 0.5rem 0;">`;
                            } else if (trimmedPart.startsWith('>')) {
                                contentHTML += `<blockquote style="border-left: 3px solid #ccc; padding-left: 1rem; margin: 0.5rem 0; font-style: italic;">${trimmedPart.substring(1).trim()}</blockquote>`;
                            } else if (trimmedPart.startsWith('## ')) {
                                contentHTML += `<h3 style="font-size: 1.2rem; font-weight: bold;">${trimmedPart.substring(3).trim()}</h3>`;
                            } else {
                                contentHTML += `<p>${part}</p>`;
                            }
                        });
                    }

                    return `
                        <div class="user-post-item" data-post-id="${post.id}">
                            <div class="post-content-display">
                                <div class="post-content">${contentHTML || '<p><em>(Empty Post)</em></p>'}</div>
                                <div class="post-details">
                                    <span class="post-date">Posted on ${new Date(post.created_at).toLocaleDateString()}</span>
                                    <div class="post-actions">
                                        <button class="btn-edit" title="Edit"><i class="fas fa-pencil-alt"></i></button>
                                        <button class="btn-delete" title="Delete"><i class="fas fa-trash-alt"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div class="post-edit-container" style="display: none;"></div>
                        </div>`;
                }).join('');
            }

            profileForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const newName = fullNameInput.value.trim();
                if (newName && newName !== user.user_metadata.full_name) {
                    const { data, error } = await supabase.auth.updateUser({ data: { full_name: newName } });
                    if (error) {
                        showMessage(profileMessage, error.message, 'error');
                    } else {
                        showMessage(profileMessage, 'Name updated successfully!', 'success');
                        welcomeName.textContent = `Welcome, ${newName}`;
                        // Update local cache for header
                        const cachedUser = JSON.parse(localStorage.getItem('cachedUser') || '{}');
                        cachedUser.displayName = newName;
                        localStorage.setItem('cachedUser', JSON.stringify(cachedUser));
                    }
                }
            });

            resetPasswordBtn.addEventListener('click', async () => {
                const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
                    redirectTo: `${window.location.origin}${basePath}/profile.html`,
                });
                if (error) {
                    showMessage(securityMessage, error.message, 'error');
                } else {
                    showMessage(securityMessage, 'Password reset email sent!', 'success');
                }
            });

            signOutBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                await supabase.auth.signOut();
                localStorage.removeItem('cachedUser'); // Clear the header cache
                window.location.href = `${basePath}/`;
            });

            function showMessage(element, text, type) {
                element.textContent = text;
                element.className = `message ${type}`;
                element.style.display = 'block';
                setTimeout(() => { element.style.display = 'none'; }, 4000);
            }
        }
    });
</script>