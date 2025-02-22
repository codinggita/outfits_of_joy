export const getUserDetails = async (email) => {
  try {
    const response = await fetch(`http://localhost:3000/outfits-of-joy/users/${email}`);
    if (!response.ok) throw new Error("User not found");

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching user:", error.message);
  }
};


export const updateUserDetails = async (userId, updatedData, isAddressUpdate = false) => {
  try {
    const response = await fetch(`http://localhost:3000/outfits-of-joy/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        isAddressUpdate ? { address: updatedData } : updatedData
      ),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    window.location.reload();
    return result;

  } catch (error) {
    console.error("Error updating user details:", error);
    throw error;
  }
};
