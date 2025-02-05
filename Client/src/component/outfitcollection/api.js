export const fetchCollection = async (category, page, limit) => {
    const url = `https://outfits-of-joy.onrender.com/outfits-of-joy/collection/${category}?page=${page}&limit=${limit}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error(`Error fetching collection for ${category}:`, error);
      throw error;
    }
  };