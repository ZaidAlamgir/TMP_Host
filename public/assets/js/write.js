// Define the setup function clearly
async function initWriterStudio() {
    const editorArea = document.getElementById('editor-area');
    // Safety: Are we on the write page?
    if (!editorArea) return;

    // Prevent double-running
    if (window.hasInitializedWriter) return;
    window.hasInitializedWriter = true;

    console.log("🚀 Writer Studio Script Started (Instant Mode)");

    const publishBtn = document.getElementById('publishBtn');

    // 1. GET SUPABASE CLIENT (Non-blocking)
    let supabase;
    if (window.supabaseClient) {
        supabase = window.supabaseClient;
    } else if (window.supabase) {
        supabase = window.supabase.createClient(
            'https://yfrqnghduttudqbnodwr.supabase.co', 
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcnFuZ2hkdXR0dWRxYm5vZHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NDc3MTgsImV4cCI6MjA3NDEyMzcxOH0.i7JCX74CnE7pvZnBpCbuz6ajmSgIlA9Mx0FhlPJjzxU'
        );
        window.supabaseClient = supabase;
    }

    // 2. SETUP EVENTS
    setupDynamicEvents();

    function setupDynamicEvents() {
        // Dynamic Blocks
        const blocksContainer = document.getElementById('dynamic-blocks');
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

        // 3. PUBLISH BUTTON (Verify User HERE)
        if (publishBtn) {
            publishBtn.onclick = async () => {
                const headline = document.getElementById('headline').value.trim();
                const qualification = document.getElementById('qualification').value.trim();
                const contentBody = document.getElementById('main-content').value.trim();
                const tags = document.getElementById('tags').value.split(',').map(t => t.trim()).filter(t => t);

                if (!headline || !contentBody) { alert("Headline and Content required."); return; }

                publishBtn.textContent = "Verifying...";
                publishBtn.disabled = true;

                try {
                    if (!supabase) throw new Error("Supabase not initialized.");
                    
                    // A. Check Auth Just-In-Time
                    const { data: { session }, error: authError } = await supabase.auth.getSession();
                    if (authError || !session) {
                        alert("Please log in to publish.");
                        window.location.href = '/auth';
                        return;
                    }

                    // B. Check Writer Role
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('role')
                        .eq('id', session.user.id)
                        .single();

                    if (profile?.role !== 'writer') {
                        throw new Error("Access Denied: You do not have permission to publish.");
                    }

                    publishBtn.textContent = "Publishing...";

                    // C. Format Content
                    let finalMarkdown = `## ${headline}\n\n${contentBody}`;
                    document.querySelectorAll('.dynamic-block').forEach(block => {
                        const val = block.querySelector('input, textarea').value.trim();
                        if (val) {
                            const type = block.dataset.type;
                            if (type === 'subhead') finalMarkdown += `\n\n## ${val}`;
                            if (type === 'quote') finalMarkdown += `\n\n> ${val}`;
                            if (type === 'image') finalMarkdown += `\n\n![Image](${val})`;
                        }
                    });

                    // D. Insert to 'user_posts'
                    const { error: insertError } = await supabase
                        .from('user_posts') 
                        .insert({
                            user_id: session.user.id,
                            content: finalMarkdown,
                            tags: tags,
                            author_name: session.user.user_metadata.full_name || 'Writer',
                            qualification: qualification
                        });

                    if (insertError) throw insertError;

                    alert("Published Successfully!");
                    window.location.href = '/post';

                } catch (err) {
                    console.error("Publish Error:", err);
                    alert(err.message);
                    publishBtn.textContent = "Publish";
                    publishBtn.disabled = false;
                }
            };
        }
    }
}

// Run on Turbo Load (Navigation)
document.addEventListener('turbo:load', () => { window.hasInitializedWriter = false; initWriterStudio(); });
// Run on Standard Load (Refresh)
document.addEventListener('DOMContentLoaded', () => { window.hasInitializedWriter = false; initWriterStudio(); });