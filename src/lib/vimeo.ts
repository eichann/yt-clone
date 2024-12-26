import { Vimeo } from 'vimeo';

if (!process.env.VIMEO_CLIENT_ID || !process.env.VIMEO_CLIENT_SECRET || !process.env.VIMEO_ACCESS_TOKEN) {
  throw new Error('Missing Vimeo credentials in environment variables');
}

const client = new Vimeo(
  process.env.VIMEO_CLIENT_ID,
  process.env.VIMEO_CLIENT_SECRET,
  process.env.VIMEO_ACCESS_TOKEN
);

export interface VimeoVideo {
  uri: string;
  name: string;
  description: string;
  pictures: {
    sizes: Array<{
      width: number;
      height: number;
      link: string;
    }>;
  };
  user: {
    name: string;
  };
  stats: {
    plays: number;
  };
  created_time: string;
}

export async function getVimeoVideos(page = 1, perPage = 20) {
  try {
    const videos = await new Promise<{ data: VimeoVideo[] }>((resolve, reject) => {
      client.request({
        method: 'GET',
        path: '/me/videos',
        query: {
          page: String(page),
          per_page: String(perPage),
          fields: 'uri,name,description,pictures,user,stats,created_time',
          sort: 'date',
          direction: 'desc'
        },
      }, (error, body, statusCode) => {
        if (error) {
          console.error('Vimeo API Error:', error);
          reject(error);
          return;
        }
        if (statusCode !== 200) {
          reject(new Error(`Unexpected status code: ${statusCode}`));
          return;
        }
        resolve(body);
      });
    });

    if (!videos.data || !Array.isArray(videos.data)) {
      throw new Error('Invalid response format from Vimeo API');
    }

    return videos.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
}

export async function testVimeoConnection() {
  return new Promise((resolve, reject) => {
    client.request({
      method: 'GET',
      path: '/me',
    }, (error, body) => {
      if (error) {
        console.error('Vimeo connection test failed:', error);
        reject(error);
        return;
      }
      console.log('Vimeo connection successful:', body);
      resolve(body);
    });
  });
} 
