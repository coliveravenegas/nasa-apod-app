# NASA APOD Dashboard

A modern React application that displays NASA's Astronomy Picture of the Day (APOD) with an intuitive interface for exploring space imagery.

## Project Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

2. **Add your NASA API KEY**
   Create a .env.local file at the root of the project and add your api key

```
NASA_API_KEY=your_api_key
```

3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Start the development server**
   ```bash
   npm run dev
   ```
5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

### API Key

## The app uses the NASA APOD API with a demo key. You can get your own at [https://api.nasa.gov/index.html](https://api.nasa.gov/index.html).

## Improvements that could be develop later

1. **Backend/API Integration**
   - Add server-side caching to reduce NASA API calls
   - Store favorites in a database for user accounts
   - Add authentication for personalized experiences

2. **Advanced Features**
   - Search and filter APODs by date range, media type, or keywords
   - Social sharing and download options for images
   - Dark/light theme toggle and user preferences

3. **Performance**
   - Image lazy loading and CDN integration
   - Virtual scrolling for large APOD lists

4. **Testing & Quality**
   - More unit and E2E tests (Jest, Playwright)
   - Accessibility improvements and audits
   - Analytics and performance monitoring

## Tradeoffs

- We are using next api routes instead of server actions and it can be implemented later.
- I'm only handling the cases for youtube embeds and mp4 native, not supporting other video providers.
