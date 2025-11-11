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

</style>
<div class="profile-container-wrapper">
    <div class="profile-layout">
        <nav class="profile-nav">
            <h3 id="welcome-name">Welcome</h3> <ul>
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
        let currentUser = null; // Store user globally within this scope

        supabase.auth.onAuthStateChange((event, session) => {
            currentUser = session?.user; // Update global user on auth change
            if (currentUser) {
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
                isProfileInitialized = false; // Reset flag on logout
            }
        });

        function initializeProfilePage(user, supabase, basePath) {
            // Ensure user is passed correctly
            if (!user) return;

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
            const deleteAccountBtn = document.getElementById('deleteAccountBtn');
            const deleteMessage = document.getElementById('deleteMessage');


            const currentName = user.user_metadata?.full_name || user.email;
            welcomeName.textContent = `Welcome, ${currentName}`;
            fullNameInput.value = user.user_metadata?.full_name || '';
            emailInput.value = user.email || '';

            navLinks.forEach(link => link.addEventListener('click', (e) => {
                e.preventDefault();
                if (link.id === 'sign-out-btn') return;
                const targetViewId = link.getAttribute('data-view');

                if (targetViewId === 'my-posts-view') {
                    loadUserPosts(user, supabase); // Pass user explicitly
                }

                views.forEach(view => view.classList.remove('active'));
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                const targetView = document.getElementById(targetViewId);
                targetView.classList.add('active');
                link.classList.add('active');
            }));

            const myPostsList = document.getElementById('my-posts-list');
            myPostsList.addEventListener('click', async (e) => {
                const target = e.target;
                const postItem = target.closest('.user-post-item');
                if (!postItem) return;

                const postId = postItem.dataset.postId;
                 // Get user ID securely from the currentUser object
                const currentUserId = currentUser?.id;
                if (!currentUserId) {
                   console.error("User not available for action.");
                   return; // Should not happen if page requires auth
                }

                if (target.closest('.btn-delete')) {
                    if (!postId) return;
                    if (confirm('Are you sure you want to permanently delete this post?')) {
                        // Secure delete via RPC
                         const { error } = await supabase.rpc('delete_user_post', {
                           post_id_to_delete: postId,
                           user_id_making_request: currentUserId // Pass the current user's ID
                         });

                        if (error) {
                            alert(`Error deleting post: ${error.message}`);
                        } else {
                            postItem.style.transition = 'opacity 0.3s ease';
                            postItem.style.opacity = '0';
                            setTimeout(() => postItem.remove(), 300);
                        }
                    }
                }
                else if (target.closest('.btn-edit')) {
                    const contentDisplay = postItem.querySelector('.post-content-display');
                    // Prevent multiple edit forms on the same post
                    if (postItem.querySelector('.post-edit-container') && postItem.querySelector('.post-edit-container').style.display !== 'none') return;

                    // Ensure edit container exists or create it
                    let editContainer = postItem.querySelector('.post-edit-container');
                    if (!editContainer) {
                        editContainer = document.createElement('div');
                        editContainer.className = 'post-edit-container';
                        editContainer.style.display = 'none'; // Start hidden
                        postItem.appendChild(editContainer);
                    }


                    const originalContentHTML = contentDisplay.querySelector('.post-content').innerHTML;

                    let formHTML = '';

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
                    editContainer.style.display = 'block'; // Show the edit form
                }
                else if (target.closest('.btn-save')) {
                    const contentDisplay = postItem.querySelector('.post-content-display');
                    const editContainer = postItem.querySelector('.post-edit-container');

                    const newContent = Array.from(editContainer.querySelectorAll('.dynamic-block')).map(block => {
                        const type = block.dataset.blockType;
                        const value = block.querySelector('input, textarea').value.trim();
                        // --- Ensure correct Markdown formatting ---
                        if (type === 'image') return `![Image](${value})`; // Add Markdown format
                        if (type === 'quote') return `> ${value}`;
                        if (type === 'headline') return `## ${value}`; // Use Markdown H2 for H3 display
                        return value; // Paragraph
                    }).filter(v => v).join('\n\n'); // Join with double newline

                    // Ensure update only happens for the correct user
                    const { error } = await supabase.from('posts')
                        .update({ content: newContent })
                        .eq('id', postId)
                        .eq('user_id', currentUserId); // Add user_id check

                    if (error) {
                        alert(`Error updating post: ${error.message}`);
                    } else {
                        // Reload posts for the user to reflect changes
                        loadUserPosts(currentUser, supabase);
                        // Optionally: just update the specific post display instead of full reload
                        // contentDisplay.querySelector('.post-content').innerHTML = parseContentToHTML(newContent); // Need a function like this
                        // editContainer.style.display = 'none';
                        // contentDisplay.style.display = 'block';
                    }
                }
                else if (target.closest('.btn-cancel')) {
                    const contentDisplay = postItem.querySelector('.post-content-display');
                    const editContainer = postItem.querySelector('.post-edit-container');

                    editContainer.innerHTML = ''; // Clear the edit form
                    editContainer.style.display = 'none';
                    contentDisplay.style.display = 'block';
                }
            });

            // Helper function to convert simple Markdown to basic HTML for display
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
                         } else if (trimmedPart){ // Only add non-empty paragraphs
                             html += `<p>${trimmedPart.replace(/\n/g, '<br>')}</p>`; // Handle line breaks within paragraphs
                         }
                     });
                 }
                 return html || '<p><em>(Empty Post)</em></p>';
            }


            async function loadUserPosts(userForPosts, supabaseInstance) { // Renamed parameters
                const postsList = document.getElementById('my-posts-list');
                postsList.innerHTML = '<div class="loader"></div>'; // Assuming you have a .loader style

                const { data: posts, error } = await supabaseInstance
                    .from('posts')
                    .select('*')
                    .eq('user_id', userForPosts.id) // Use the passed user ID
                    .order('created_at', { ascending: false });

                if (error) {
                    postsList.innerHTML = `<div class="message error">Could not load your posts. ${error.message}</div>`;
                    return;
                }

                if (!posts || posts.length === 0) {
                    postsList.innerHTML = `<p>You haven't created any posts yet.</p>`;
                    return;
                }

                postsList.innerHTML = posts.map(post => {
                    const contentHTML = parseContentToHTML(post.content); // Use the helper

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
                const newName = fullNameInput.value.trim();
                const currentMetaName = user.user_metadata?.full_name || '';
                if (newName && newName !== currentMetaName) {
                    const { data, error } = await supabase.auth.updateUser({ data: { full_name: newName } });
                    if (error) {
                        showMessage(profileMessage, `Error updating name: ${error.message}`, 'error');
                    } else {
                        showMessage(profileMessage, 'Name updated successfully!', 'success');
                        welcomeName.textContent = `Welcome, ${newName}`;
                        // Update local cache if used
                        const cachedUser = JSON.parse(localStorage.getItem('cachedUser') || '{}');
                        if (cachedUser.uid === user.id) {
                           cachedUser.displayName = newName;
                           localStorage.setItem('cachedUser', JSON.stringify(cachedUser));
                        }
                        // Trigger header update if needed
                        if (typeof initializeSupabaseHeader === 'function') {
                           initializeSupabaseHeader(basePath, true); // Force rerender
                        }
                    }
                } else if (!newName) {
                     showMessage(profileMessage, 'Name cannot be empty.', 'error');
                } else {
                    showMessage(profileMessage, 'Name is already up to date.', 'info');
                }
            });

            resetPasswordBtn.addEventListener('click', async () => {
                // Ensure user.email is available
                if (!user.email) {
                    showMessage(securityMessage, 'Cannot reset password without a verified email.', 'error');
                    return;
                }
                const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
                    redirectTo: `${window.location.origin}${basePath}/auth.html?view=update-password`, // Redirect to auth page
                });
                if (error) {
                    showMessage(securityMessage, `Error sending reset email: ${error.message}`, 'error');
                } else {
                    showMessage(securityMessage, 'Password reset email sent! Check your inbox.', 'success');
                }
            });

            signOutBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                showMessage(welcomeName, 'Logging out...', 'info'); // Provide feedback
                const { error } = await supabase.auth.signOut();
                localStorage.removeItem('cachedUser'); // Clear cache immediately
                if (error) {
                   console.error("Sign out error:", error);
                   // Still proceed to redirect
                }
                // Auth listener will handle redirect
            });

            // --- Updated Delete Account Logic ---
            deleteAccountBtn.addEventListener('click', async () => {
                if (!confirm('Are you absolutely sure you want to delete your account? This will remove all your posts and profile data permanently. This action cannot be undone.')) {
                    return;
                }
                if (!confirm('Second confirmation: Please confirm again that you wish to permanently delete your account.')) {
                    return;
                }

                showMessage(deleteMessage, 'Deleting account...', 'info');
                deleteAccountBtn.disabled = true;

                try {
                    // Invoke the Edge Function
                    const { data, error: functionError } = await supabase.functions.invoke('delete-user-account');

                    // Check for function-specific errors first
                    if (functionError) throw functionError;
                     // Check if the function itself returned an error in its response body
                     if (data && data.error) throw new Error(data.error);


                    // If function call is successful:
                    showMessage(deleteMessage, 'Account deleted successfully. Logging out...', 'success');
                     // Sign out might fail if user is already deleted, but try anyway
                    await supabase.auth.signOut().catch(err => console.warn("Sign out after delete failed (expected if user already gone):", err));
                    localStorage.removeItem('cachedUser');
                    setTimeout(() => {
                        window.location.href = `${basePath}/`; // Redirect to homepage
                    }, 2500); // Slightly longer delay

                } catch (error) {
                    console.error("Error deleting account:", error);
                     // Try to get a more specific error message
                    const errMsg = error.context?.message // Supabase FunctionError structure
                                || error.message          // Standard JS Error
                                || 'Could not delete account. Please contact support.';
                    showMessage(deleteMessage, `Error: ${errMsg}`, 'error');
                    deleteAccountBtn.disabled = false;
                }
            });
            // --- End Delete Account Logic ---

             function showMessage(element, text, type) {
                element.textContent = text;
                element.className = `message ${type}`;
                element.style.display = 'block';
                const duration = type === 'info' ? 2500 : 5000; // Longer duration for feedback
                // Clear previous timeouts if any
                if (element.timeoutId) clearTimeout(element.timeoutId);
                element.timeoutId = setTimeout(() => {
                    if (element) { // Check if element still exists
                        element.style.display = 'none';
                        element.textContent = ''; // Clear text after hiding
                    }
                }, duration);
            }
        } // End initializeProfilePage
    }); // End DOMContentLoaded
</script>