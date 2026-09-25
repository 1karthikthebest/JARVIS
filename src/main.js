import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
  <main class="dashboard">
    <header>
      <div>
        <p class="eyebrow">NASA • ASTRONOMY PICTURE OF THE DAY</p>
        <h1>JARVIS</h1>
        <p id="date"></p>
      </div>
      <button id="refresh">↻ Refresh</button>
    </header>

    <section class="card">
      <div id="status">Loading today's cosmic image...</div>
      <img id="apod-image" alt="NASA Astronomy Picture of the Day">
      <div class="content">
        <h2 id="title"></h2>
        <p id="explanation"></p>
      </div>
    </section>
  </main>
`

const image = document.querySelector('#apod-image')
const title = document.querySelector('#title')
const explanation = document.querySelector('#explanation')
const status = document.querySelector('#status')
const date = document.querySelector('#date')

async function loadAPOD() {
  status.textContent = 'Connecting to NASA...'

  try {
    const response = await fetch(
      'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'
    )

    if (!response.ok) throw new Error('NASA API error')

    const data = await response.json()

    date.textContent = data.date
    title.textContent = data.title
    explanation.textContent = data.explanation

    if (data.media_type === 'image') {
      image.src = data.url
      image.style.display = 'block'
    }

    status.textContent = 'NASA DATA • ONLINE'
  } catch (error) {
    status.textContent = 'NASA connection failed.'
    console.error(error)
  }
}

document.querySelector('#refresh').addEventListener('click', loadAPOD)

loadAPOD()