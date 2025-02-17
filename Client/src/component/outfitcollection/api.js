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

  export const fetchTotalCount = async (category) => {
    const url = `https://outfits-of-joy.onrender.com/outfits-of-joy/collection/${category}?page=1&limit=1000000`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch total count");
        const data = await response.json();
        return data.length; 
    } catch (error) {
        console.error(`Error fetching total count for ${category}:`, error);
        throw error;
    }
};


export const fetchProduct = async (category, _id) => {
  try {
    const response = await fetch(`https://outfits-of-joy.onrender.com/outfits-of-joy/collection/${category}/${_id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};