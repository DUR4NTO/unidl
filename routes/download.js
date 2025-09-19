const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();

// প্ল্যাটফর্ম ডিটেকশন ফাংশন
function detectPlatform(url) {
  if (url.includes('facebook.com') || url.includes('fb.com') || url.includes('fb.watch')) {
    return 'facebook';
  } else if (url.includes('instagram.com') || url.includes('instagr.am')) {
    return 'instagram';
  } else if (url.includes('tiktok.com')) {
    return 'tiktok';
  } else if (url.includes('twitter.com') || url.includes('x.com')) {
    return 'twitter';
  } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  } else {
    return 'unknown';
  }
}

// Facebook ভিডিও ডাউনলোডার
async function downloadFacebookVideo(url) {
  try {
    const response = await axios.get(`https://www.getfvid.com/downloader`, {
      params: { url },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const downloadBtn = $('a[download*="facebook"]');
    
    if (downloadBtn.length > 0) {
      return {
        success: true,
        video_url: downloadBtn.attr('href'),
        title: $('div.card-body h5').text() || 'Facebook Video'
      };
    }
    
    return { success: false, error: 'Facebook video not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Instagram ভিডিও ডাউনলোডার
async function downloadInstagramVideo(url) {
  try {
    const response = await axios.get(`https://downloadgram.org/process.php`, {
      params: { url },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const downloadLink = $('a.download');
    
    if (downloadLink.length > 0) {
      return {
        success: true,
        video_url: downloadLink.attr('href'),
        title: $('h2').text() || 'Instagram Video'
      };
    }
    
    return { success: false, error: 'Instagram video not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// TikTok ভিডিও ডাউনলোডার
async function downloadTikTokVideo(url) {
  try {
    const response = await axios.get(`https://ssstik.io/en`, {
      params: { url },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const downloadLink = $('a.without_watermark');
    
    if (downloadLink.length > 0) {
      return {
        success: true,
        video_url: downloadLink.attr('href'),
        title: $('p.maintext').text() || 'TikTok Video'
      };
    }
    
    return { success: false, error: 'TikTok video not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ডাউনলোড এন্ডপয়েন্ট
router.post('/', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    
    const platform = detectPlatform(url);
    let result;
    
    switch (platform) {
      case 'facebook':
        result = await downloadFacebookVideo(url);
        break;
      case 'instagram':
        result = await downloadInstagramVideo(url);
        break;
      case 'tiktok':
        result = await downloadTikTokVideo(url);
        break;
      default:
        return res.status(400).json({ error: 'Unsupported platform' });
    }
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(404).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
