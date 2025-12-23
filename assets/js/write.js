// Define the setup function clearly
async function initWriterStudio() {
    const editorArea = document.getElementById('editor-area');
    
    // Safety: Are we on the write page?
    if (!editorArea) return;

    // Prevent double-running
    if (window.hasInitializedWriter) return;
    window.hasInitializedWriter = true;

    console.log("🚀 Writer Studio Script Started");

    const authLoader = document.getElementById('auth-loader');
    const errorMsg = document.getElementById('error-msg');
    const publishBtn = document.getElementById('publishBtn');

    // 1. GET SUPABASE CLIENT
    let supabase;
    if (window.supabaseClient) {
        supabase = window.supabaseClient;
    } else if (window.supabase) {
        supabase = window.supabase.createClient(
            'https://yfrqnghduttudqbnodwr.supabase.co', 
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcnFuZ2hkdXR0dWRxYm5vZHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NDc3MTgsImV4cCI6MjA3NDEyMzcxOH0.i7JCX74CnE7pvZnBpCbuz6ajmSgIlA9Mx0FhlPJjzxU'
        );
        window.supabaseClient = supabase;
    } else {
        // Fallback: If script loaded too fast, wait 500ms and try again
        console.warn("Supabase not ready, retrying...");
        setTimeout(() => { window.hasInitializedWriter=false; initWriterStudio(); }, 500);
        return;
    }

    // 2. CHECK AUTH
    try {
        console.log("🔐 Verifying User...");
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session) {
            console.log("User not logged in.");
            window.location.href = '/auth';
            return;
        }

        // Check Role
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

        if (profile?.role !== 'writer') {
            alert("Access Denied: Writers Only.");
            window.location.href = '/post';
            return;
        }

        // 3. SUCCESS - SHOW EDITOR
        console.log("✅ Authorized. Showing Editor.");
        if(authLoader) authLoader.style.display = 'none';
        if(editorArea) editorArea.style.display = 'block';

    } catch (err) {
        console.error("Auth Error:", err);
        if(authLoader) authLoader.style.display = 'none';
        if(errorMsg) {
            errorMsg.innerText = "Error: " + err.message;
            errorMsg.style.display = 'block';
        }
    }

    // 4. SETUP EVENTS (Only if not already attached)
    setupDynamicEvents();

    function setupDynamicEvents() {
        // Dynamic Blocks
        const blocksContainer = document.getElementById('dynamic-blocks');
        // Clean up old listeners to prevent duplicates
        window.removeEventListener('tmp:add-block', handleAddBlock); 
        window.addEventListener('tmp:add-block', handleAddBlock);

        function handleAddBlock(e) {
            const type = e.detail.type;
            const div = document.createElement('div');
            div.className = `dynamic-block block-${type}`;
            div.dataset.type = type;

            let inputHtml = '';
            if (type === 'subhead') inputHtml = '<input type="text" placeholder="Sub-heading..." style="font-weight:bold; font-size:1.2em;">';
            if (type === 'image') inputHtml = '<input type="text" placeholder="Paste Image URL here (https://...)">';
            if (type === 'quote') inputHtml = '<textarea rows="2" placeholder="Quote text..." style="font-style:italic;"></textarea>';

            div.innerHTML = `
                <span class="remove-block" onclick="this.parentElement.remove()" style="float:right; cursor:pointer; color:red; font-weight:bold;">&times; Remove</span>
                ${inputHtml}
            `;
            blocksContainer.appendChild(div);
        }

        // Word Count
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.oninput = (e) => {
                const text = e.target.value.trim();
                const words = text ? text.split(/\s+/).length : 0;
                document.getElementById('word-count').textContent = `${words} words`;
                publishBtn.disabled = words < 10;
            };
        }

        // Publish Button
        if (publishBtn) {
            publishBtn.onclick = async () => {
                const headline = document.getElementById('headline').value.trim();
                const contentBody = document.getElementById('main-content').value.trim();
                const tags = document.getElementById('tags').value.split(',').map(t => t.trim()).filter(t => t);

                if (!headline || !contentBody) { alert("Headline and Content required."); return; }

                publishBtn.textContent = "Publishing...";
                publishBtn.disabled = true;

                // Build Markdown
                let finalMarkdown = contentBody;
                document.querySelectorAll('.dynamic-block').forEach(block => {
                    const val = block.querySelector('input, textarea').value.trim();
                    if (val) {
                        const type = block.dataset.type;
                        if (type === 'subhead') finalMarkdown += `\n\n## ${val}`;
                        if (type === 'quote') finalMarkdown += `\n\n> ${val}`;
                        if (type === 'image') finalMarkdown += `\n\n![Image](${val})`;
                    }
                });

                // --- CRITICAL FIX: CALL THE NEW FUNCTION ---
                const { error } = await supabase.functions.invoke('push-to-firebase', {
                    body: { headline, content: finalMarkdown, tags }
                });

                if (error) {
                    console.error("Publish Error:", error);
                    alert("Error: " + error.message);
                    publishBtn.textContent = "Publish";
                    publishBtn.disabled = false;
                } else {
                    alert("Published Successfully!");
                    window.location.href = '/post';
                }
            };
        }
    }
}

// Run on Turbo Load (Navigation)
document.addEventListener('turbo:load', () => { window.hasInitializedWriter = false; initWriterStudio(); });
// Run on Standard Load (Refresh)
document.addEventListener('DOMContentLoaded', () => { window.hasInitializedWriter = false; initWriterStudio(); });