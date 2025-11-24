---
layout: authenticated
title: My Account - The Muslim Post
---
<style>
    /* --- Styles for "Back" Navigation --- */
    .profile-header-actions {
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
    }
    .btn-back-smart {
        background: none;
        border: 1px solid #e5e7eb;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        color: #4b5563;
        font-size: 0.9rem;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.2s;
        text-decoration: none;
    }
    .btn-back-smart:hover {
        background-color: #f3f4f6;
        color: #1f2937;
    }

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

    /* --- Styles for the Edit Form Actions --- */
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
    /* --- Delete Account Section Styles --- */
    .delete-account-section {
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid #eee;
    }
    .delete-account-section h2 {
        color: #dc2626; /* Red color for warning */
        font-size: 1.5rem; /* Slightly smaller than main titles */
        margin-bottom: 0.5rem;
    }
    .delete-account-section p {
        font-size: 0.9rem;
        color: #606770;
        margin-bottom: 1rem;
    }
    .btn-danger {
        background-color: #dc2626;
        color: white;
        padding: 10px 18px;
        border: none;
        border-radius: 8px;
        font-size: 0.95rem;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    .btn-danger:hover {
        background-color: #b91c1c;
    }
     .message { /* Adjusted styles for consistency */
        padding: 0.75rem; border-radius: 6px; margin-top: 1rem; font-weight: 500; font-size: 0.9rem; display: none;
    }
    .message.success { background-color: #d1fae5; color: #065f46; border: 1px solid #6ee7b7; }
    .message.error { background-color: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; }
    .message.info { background-color: #dbeafe; color: #1e40af; border: 1px solid #93c5fd; }
    
    .loader {
        border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 30px; height: 30px; animation: spin 1s linear infinite; margin: 20px auto;
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

</style>
<div class="profile-container-wrapper">
    <div class="profile-layout">
        <nav class="profile-nav">
             <div class="profile-header-actions">
                <button id="smart-back-btn" class="btn-back-smart">
                    <i class="fas fa-arrow-left"></i> Back
                </button>
            </div>
            
            <h3 id="welcome-name">Welcome</h3>
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

                <div class="delete-account-section">
                    <h2>Delete Account</h2>
                    <p>Permanently delete your account and all associated data (posts, profile). This action cannot be undone.</p>
                    <button id="deleteAccountBtn" class="btn-danger">Delete My Account</button>
                    <div id="deleteMessage" class="message"></div>
                </div>
                </div>
            <div id="my-posts-view" class="profile-view">
                <h2>My Posts</h2>
                <div id="my-posts-list">
                    </div>
            </div>
        </main>
    </div>
</div>

<script>
    // --- SUPABASE CONFIGURATION ---
    const SUPABASE_URL = 'https://yfrqnghduttudqbnodwr.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcnFuZ2hkdXR0dWRxYm5vZHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NDc3MTgsImV4cCI6MjA3NDEyMzcxOH0.i7JCX74CnE7pvZnBpCbuz6ajmSgIlA9Mx0FhlPJjzxU';

    document.addEventListener('turbo:load', () => {
        const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        const basePath = document.body.getAttribute('data-base-path') || '';

        let isProfileInitialized = false;
        let currentUser = null; 

        // 1. Check for immediate LocalStorage cache to populate UI before Auth confirms
        const cachedUserStr = localStorage.getItem('tmp_cached_user_details');
        if (cachedUserStr) {
            const cachedUser = JSON.parse(cachedUserStr);
            populateProfileFields(cachedUser.full_name, cachedUser.email);
            document.querySelector('.profile-container-wrapper').style.display = 'block';
        }

        supabase.auth.onAuthStateChange((event, session) => {
            currentUser = session?.user; 
            if (currentUser) {
                // Update Cache on Auth confirm
                const fullName = currentUser.user_metadata?.full_name || '';
                const email = currentUser.email || '';
                localStorage.setItem('tmp_cached_user_details', JSON.stringify({ full_name: fullName, email: email }));
                
                if (typeof initializeSupabaseHeader === 'function') {
                    initializeSupabaseHeader(basePath, true);
                }
                if (!isProfileInitialized) {
                    initializeProfilePage(currentUser, supabase, basePath);
                    isProfileInitialized = true;
                }
                document.querySelector('.profile-container-wrapper').style.display = 'block';
            } else {
                window.location.replace(`${basePath}/auth.html`);
                isProfileInitialized = false; 
                localStorage.removeItem('tmp_cached_user_details'); // Clear partial cache
            }
        });

        // Helper to separate UI population
        function populateProfileFields(name, email) {
            const welcomeName = document.getElementById('welcome-name');
            const fullNameInput = document.getElementById('fullName');
            const emailInput = document.getElementById('email');
            
            if(welcomeName) welcomeName.textContent = `Welcome, ${name || email}`;
            if(fullNameInput) fullNameInput.value = name || '';
            if(emailInput) emailInput.value = email || '';
        }

        function initializeProfilePage(user, supabase, basePath) {
            if (!user) return;

            const profileForm = document.getElementById('profileForm');
            const resetPasswordBtn = document.getElementById('resetPasswordBtn');
            const signOutBtn = document.getElementById('sign-out-btn');
            const profileMessage = document.getElementById('profileMessage');
            const securityMessage = document.getElementById('securityMessage');
            const navLinks = document.querySelectorAll('.nav-link');
            const views = document.querySelectorAll('.profile-view');
            const deleteAccountBtn = document.getElementById('deleteAccountBtn');
            const deleteMessage = document.getElementById('deleteMessage');
            const backBtn = document.getElementById('smart-back-btn');

            // --- SMART BACK BUTTON LOGIC ---
            backBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Check if referrer exists and is within the same domain (not external)
                if (document.referrer && document.referrer.indexOf(window.location.host) !== -1) {
                    // It's an internal link, safe to go back
                    history.back();
                } else {
                    // Came from external site or direct link, go to Home
                    window.location.href = `${basePath}/`;
                }
            });

            populateProfileFields(user.user_metadata?.full_name, user.email);

            navLinks.forEach(link => link.addEventListener('click', (e) => {
                e.preventDefault();
                if (link.id === 'sign-out-btn') return;
                const targetViewId = link.getAttribute('data-view');

                if (targetViewId === 'my-posts-view') {
                    loadUserPosts(user, supabase); 
                }

                views.forEach(view => view.classList.remove('active'));
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                const targetView = document.getElementById(targetViewId);
                targetView.classList.add('active');
                link.classList.add('active');
            }));

            const myPostsList = document.getElementById('my-posts-list');
            
            // --- EVENT DELEGATION FOR POST ACTIONS ---
            myPostsList.addEventListener('click', async (e) => {
                const target = e.target;
                const postItem = target.closest('.user-post-item');
                if (!postItem) return;

                const postId = postItem.dataset.postId;
                const currentUserId = currentUser?.id;

                // --- DELETE ACTION ---
                if (target.closest('.btn-delete')) {
                    if (!postId) return;
                    if (confirm('Are you sure you want to permanently delete this post?')) {
                        const { error } = await supabase.rpc('delete_user_post', {
                           post_id_to_delete: postId,
                           user_id_making_request: currentUserId 
                        });

                        if (error) {
                            alert(`Error deleting post: ${error.message}`);
                        } else {
                            // Update UI
                            postItem.style.transition = 'opacity 0.3s ease';
                            postItem.style.opacity = '0';
                            setTimeout(() => postItem.remove(), 300);
                            
                            // INVALIDATE CACHE
                            invalidatePostsCache(currentUserId);
                        }
                    }
                }
                // --- EDIT (START) ACTION ---
                else if (target.closest('.btn-edit')) {
                    const contentDisplay = postItem.querySelector('.post-content-display');
                    if (postItem.querySelector('.post-edit-container') && postItem.querySelector('.post-edit-container').style.display !== 'none') return;

                    let editContainer = postItem.querySelector('.post-edit-container');
                    if (!editContainer) {
                        editContainer = document.createElement('div');
                        editContainer.className = 'post-edit-container';
                        editContainer.style.display = 'none';
                        postItem.appendChild(editContainer);
                    }

                    const originalContentHTML = contentDisplay.querySelector('.post-content').innerHTML;
                    let formHTML = '';

                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = originalContentHTML;
                    Array.from(tempDiv.children).forEach(node => {
                        const type = node.tagName.toLowerCase();
                        // (Parsing logic remains the same)
                        if (type === 'p') formHTML += `<div class="dynamic-block" data-block-type="paragraph"><h3>Paragraph</h3><textarea rows="5">${node.textContent}</textarea></div>`;
                        else if (type === 'blockquote') formHTML += `<div class="dynamic-block" data-block-type="quote"><h3>Quote</h3><textarea rows="3">${node.textContent}</textarea></div>`;
                        else if (type === 'h3') formHTML += `<div class="dynamic-block" data-block-type="headline"><h3>Headline</h3><input type="text" class="headline-input" value="${node.textContent}"></div>`;
                        else if (type === 'img') formHTML += `<div class="dynamic-block" data-block-type="image"><h3>Image URL</h3><input type="text" value="${node.src}"></div>`;
                    });
                    
                    if (formHTML === '') { // Fallback for simple text
                        formHTML += `<div class="dynamic-block" data-block-type="paragraph"><h3>Paragraph</h3><textarea rows="5">${tempDiv.textContent.trim()}</textarea></div>`;
                    }

                    editContainer.innerHTML = `${formHTML}
                        <div class="edit-actions-container">
                            <button class="btn-cancel">Cancel</button>
                            <button class="btn-save">Save</button>
                        </div>`;

                    contentDisplay.style.display = 'none';
                    editContainer.style.display = 'block';
                }
                // --- SAVE EDIT ACTION ---
                else if (target.closest('.btn-save')) {
                    const editContainer = postItem.querySelector('.post-edit-container');

                    const newContent = Array.from(editContainer.querySelectorAll('.dynamic-block')).map(block => {
                        const type = block.dataset.blockType;
                        const value = block.querySelector('input, textarea').value.trim();
                        if (type === 'image') return `![Image](${value})`; 
                        if (type === 'quote') return `> ${value}`;
                        if (type === 'headline') return `## ${value}`; 
                        return value;
                    }).filter(v => v).join('\n\n');

                    const { error } = await supabase.from('posts')
                        .update({ content: newContent })
                        .eq('id', postId)
                        .eq('user_id', currentUserId);

                    if (error) {
                        alert(`Error updating post: ${error.message}`);
                    } else {
                        // INVALIDATE CACHE so next reload gets fresh data
                        invalidatePostsCache(currentUserId);
                        // Refresh just this list (or just the item to be faster)
                        loadUserPosts(currentUser, supabase, true); // Force Refresh
                    }
                }
                else if (target.closest('.btn-cancel')) {
                    const contentDisplay = postItem.querySelector('.post-content-display');
                    const editContainer = postItem.querySelector('.post-edit-container');
                    editContainer.innerHTML = '';
                    editContainer.style.display = 'none';
                    contentDisplay.style.display = 'block';
                }
            });

            function parseContentToHTML(content) {
                 let html = '';
                 if (content) {
                     content.split('\n\n').forEach(part => {
                         const trimmedPart = part.trim();
                         if (trimmedPart.startsWith('![')) {
                             const url = trimmedPart.match(/\((.*?)\)/)?.[1];
                             if (url) html += `<img src="${url}" style="max-width: 100%; border-radius: 8px; margin: 0.5rem 0;">`;
                         } else if (trimmedPart.startsWith('>')) {
                             html += `<blockquote style="border-left: 3px solid #ccc; padding-left: 1rem; margin: 0.5rem 0; font-style: italic;">${trimmedPart.substring(1).trim()}</blockquote>`;
                         } else if (trimmedPart.startsWith('## ')) {
                             html += `<h3 style="font-size: 1.2rem; font-weight: bold;">${trimmedPart.substring(3).trim()}</h3>`;
                         } else if (trimmedPart){ 
                             html += `<p>${trimmedPart.replace(/\n/g, '<br>')}</p>`;
                         }
                     });
                 }
                 return html || '<p><em>(Empty Post)</em></p>';
            }

            // --- SMART CACHING FUNCTIONS ---
            function getCacheKey(userId) { return `user_posts_${userId}`; }
            
            function invalidatePostsCache(userId) {
                localStorage.removeItem(getCacheKey(userId));
            }

            async function loadUserPosts(userForPosts, supabaseInstance, forceRefresh = false) { 
                const postsList = document.getElementById('my-posts-list');
                
                // 1. Try Cache First (if not forcing refresh)
                const cacheKey = getCacheKey(userForPosts.id);
                if (!forceRefresh) {
                    const cachedData = localStorage.getItem(cacheKey);
                    if (cachedData) {
                        const { posts, timestamp } = JSON.parse(cachedData);
                        const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
                        if (Date.now() - timestamp < CACHE_DURATION) {
                            renderPosts(posts, postsList);
                            console.log("Loaded posts from cache");
                            return;
                        }
                    }
                }

                postsList.innerHTML = '<div class="loader"></div>'; 

                // 2. Fetch from Network
                const { data: posts, error } = await supabaseInstance
                    .from('posts')
                    .select('*')
                    .eq('user_id', userForPosts.id)
                    .order('created_at', { ascending: false });

                if (error) {
                    postsList.innerHTML = `<div class="message error">Could not load posts. ${error.message}</div>`;
                    return;
                }

                // 3. Save to Cache
                if (posts) {
                    localStorage.setItem(cacheKey, JSON.stringify({
                        posts: posts,
                        timestamp: Date.now()
                    }));
                }

                renderPosts(posts, postsList);
            }

            function renderPosts(posts, container) {
                if (!posts || posts.length === 0) {
                    container.innerHTML = `<p>You haven't created any posts yet.</p>`;
                    return;
                }

                container.innerHTML = posts.map(post => {
                    const contentHTML = parseContentToHTML(post.content);
                    return `
                        <div class="user-post-item" data-post-id="${post.id}">
                            <div class="post-content-display">
                                <div class="post-content">${contentHTML}</div>
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
                const newName = document.getElementById('fullName').value.trim();
                const currentMetaName = user.user_metadata?.full_name || '';
                
                if (newName && newName !== currentMetaName) {
                    const { data, error } = await supabase.auth.updateUser({ data: { full_name: newName } });
                    if (error) {
                        showMessage(profileMessage, `Error: ${error.message}`, 'error');
                    } else {
                        showMessage(profileMessage, 'Name updated!', 'success');
                        document.getElementById('welcome-name').textContent = `Welcome, ${newName}`;
                        
                        // Update local cache
                        localStorage.setItem('tmp_cached_user_details', JSON.stringify({ full_name: newName, email: user.email }));
                    }
                }
            });

            resetPasswordBtn.addEventListener('click', async () => {
                if (!user.email) return;
                const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
                    redirectTo: `${window.location.origin}${basePath}/auth.html?view=update-password`, 
                });
                if (error) showMessage(securityMessage, `Error: ${error.message}`, 'error');
                else showMessage(securityMessage, 'Reset email sent.', 'success');
            });

            signOutBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                showMessage(document.getElementById('welcome-name'), 'Logging out...', 'info'); 
                const { error } = await supabase.auth.signOut();
                localStorage.removeItem('tmp_cached_user_details'); // Clear user details
                localStorage.removeItem(`user_posts_${user.id}`); // Clear post cache
            });

            // Delete Account logic (kept same as before, simplified for brevity here)
            deleteAccountBtn.addEventListener('click', async () => {
                if (!confirm('Are you absolutely sure?')) return;
                showMessage(deleteMessage, 'Deleting...', 'info');
                try {
                    const { data, error: functionError } = await supabase.functions.invoke('delete-user-account');
                    if (functionError) throw functionError;
                    await supabase.auth.signOut();
                    localStorage.clear(); // Wipe everything
                    window.location.href = `${basePath}/`;
                } catch (error) {
                    showMessage(deleteMessage, `Error: ${error.message}`, 'error');
                }
            });

             function showMessage(element, text, type) {
                element.textContent = text;
                element.className = `message ${type}`;
                element.style.display = 'block';
                setTimeout(() => { if (element) element.style.display = 'none'; }, 3000);
            }
        } 
    }); 
</script>