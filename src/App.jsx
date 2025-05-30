import { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');

  const askGemini = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: prompt }]
              }
            ]
          })
        }
      );

      const data = await res.json();
      const text =
        data.candidates?.[0]?.content?.parts?.[0]?.text ??
        'Sin respuesta';
      setAnswer(text);
    } catch (err) {
      setAnswer('Error: ' + err.message);
    }
  };

  return (
    <main style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <form onSubmit={askGemini}>
        <label htmlFor="prompt">Ask anything</label>
        <textarea
          id="prompt"
          rows={4}
          style={{ width: '100%', marginTop: 8 }}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button type="submit" style={{ marginTop: 12 }}>
          Send
        </button>
      </form>


      <h3 style={{ marginTop: 24 }}>Answer:</h3>
      <p>{answer}</p>
    </main>
  );
}

export default App;
