from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
import asyncio
import random

app = FastAPI(title="VampireSentinel - Recon Platform")

# Home page with Matrix-Red style
@app.get("/", response_class=HTMLResponse)
async def root():
    html = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>VampireSentinel</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                background: #0a0a0a;
                color: #ff0000;
                font-family: 'Courier New', monospace;
                height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                overflow: hidden;
            }
            h1 {
                font-size: 4rem;
                text-shadow: 0 0 20px #FF0000, 0 0 40px #FF4500;
                animation: glow 3s infinite alternate;
            }
            p {
                font-size: 1.5rem;
                color: #AAAAAA;
            }
            .terminal {
                background: rgba(0,0,0,0.7);
                padding: 20px;
                border: 2px solid #8B0000;
                border-radius: 10px;
                width: 90%;
                max-width: 800px;
                height: 300px;
                overflow-y: auto;
                margin-top: 20px;
            }
            @keyframes glow {
                from { text-shadow: 0 0 10px #FF0000; }
                to { text-shadow: 0 0 40px #FF4500, 0 0 60px #DC143C; }
            }
        </style>
    </head>
    <body>
        <h1>VAMPIRE SENTINEL</h1>
        <p>Real-Time OSINT & Reconnaissance Platform</p>
        
        <div class="terminal" id="output">
            [+] Initializing Vampire Protocol...<br>
            [+] Connecting to shadow network...<br>
            [!] Threat level: CRITICAL<br>
            Ready for target input...
        </div>

        <script>
            const ws = new WebSocket(`ws://${window.location.host}/ws`);
            ws.onmessage = (event) => {
                const output = document.getElementById('output');
                output.innerHTML += '<br>' + event.data;
                output.scrollTop = output.scrollHeight;
            };
            ws.onopen = () => console.log("WebSocket connected");
        </script>
    </body>
    </html>
    """
    return html

# WebSocket for real-time updates (simulation for now)
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            fake_data = random.choice([
                "[+] Scanning target...",
                "[+] Found subdomain: admin.example.com",
                "[+] Port 80 open - HTTP service detected",
                "[+] WHOIS lookup: Registered to Unknown Entity",
                "[!] Potential vulnerability detected",
                "[+] No logs left behind"
            ])
            await websocket.send_text(fake_data)
            await asyncio.sleep(random.uniform(1, 3))
    except WebSocketDisconnect:
        pass
