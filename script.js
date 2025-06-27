document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const promptInput = document.getElementById("prompt-input");
  const charCount = document.getElementById("char-count");
  const generateBtn = document.getElementById("generate-btn");
  const modelSelect = document.getElementById("model-select");
  const speedQualityToggle = document.getElementById("speed-quality-toggle");
  const shapeButtons = document.querySelectorAll(".shape-btn");
  const styleCards = document.querySelectorAll(".style-card");
  const previewPlaceholder = document.getElementById("preview-placeholder");
  const imageContainer = document.getElementById("image-container");
  const generatedImage = document.getElementById("generated-image");
  const downloadBtn = document.getElementById("download-btn");
  const regenerateBtn = document.getElementById("regenerate-btn");
  const loadingSpinner = document.getElementById("loading-spinner");
  const proButtons = document.querySelectorAll(".pro-btn");

  // State
  let currentShape = "square";
  let currentStyle = "realistic";
  let lastGeneratedImage = null;

  // Event Listeners
  promptInput.addEventListener("input", updateCharCount);
  generateBtn.addEventListener("click", generateImage);
  downloadBtn.addEventListener("click", downloadImage);
  regenerateBtn.addEventListener("click", regenerateImage);

  // Shape selector
  shapeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      shapeButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      currentShape = button.dataset.shape;
    });
  });

  // Style selector
  styleCards.forEach((card) => {
    card.addEventListener("click", () => {
      styleCards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
      currentStyle = card.dataset.style;
    });
  });

  // Pro buttons
  proButtons.forEach((button) => {
    button.addEventListener("click", () => {
      alert(
        "Pro feature coming soon! Upgrade to access HD and Genius models, faster generation, and more styles."
      );
    });
  });

  // Functions
  function updateCharCount() {
    const count = promptInput.value.length;
    charCount.textContent = `${count}/400`;

    if (count > 400) {
      charCount.style.color = "var(--error-color)";
    } else {
      charCount.style.color = "var(--text-secondary)";
    }
  }

  async function generateImage() {
    const prompt = promptInput.value.trim();

    if (!prompt) {
      alert("Please enter a prompt to generate an image");
      return;
    }

    if (prompt.length > 400) {
      alert("Prompt must be 400 characters or less");
      return;
    }

    // Show loading spinner
    previewPlaceholder.style.display = "none";
    imageContainer.style.display = "none";
    loadingSpinner.style.display = "flex";

    // In a real implementation, you would call the OpenAI API here
    // This is a mock implementation that returns a placeholder after a delay
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock response - in a real app, you would use the API response
      const mockImageUrl = getMockImageUrl(prompt, currentStyle, currentShape);

      // Display the generated image
      generatedImage.src = mockImageUrl;
      lastGeneratedImage = mockImageUrl;

      loadingSpinner.style.display = "none";
      imageContainer.style.display = "block";
    } catch (error) {
      console.error("Error generating image:", error);
      loadingSpinner.style.display = "none";
      previewPlaceholder.style.display = "flex";
      alert("Failed to generate image. Please try again.");
    }
  }

  function getMockImageUrl(prompt, style, shape) {
    // This is a mock function - in a real app, you would use the OpenAI API
    const baseUrl = "https://source.unsplash.com/random/";
    let dimensions;

    switch (shape) {
      case "portrait":
        dimensions = "600x900";
        break;
      case "landscape":
        dimensions = "900x600";
        break;
      default: // square
        dimensions = "800x800";
    }

    // Add a random query to get different images
    const query = encodeURIComponent(prompt.split(" ")[0] || "abstract");
    return `${baseUrl}${dimensions}/?${style},${query}`;
  }

  function downloadImage() {
    if (!lastGeneratedImage) return;

    // Create a temporary anchor element
    const a = document.createElement("a");
    a.href = lastGeneratedImage;
    a.download = `dreampic-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function regenerateImage() {
    if (!promptInput.value.trim()) return;
    generateImage();
  }

  // Initialize
  updateCharCount();
});

// Note: To connect with the OpenAI API in a production environment, you would:
// 1. Add your API key (securely, not in frontend code)
// 2. Implement a proper backend endpoint
// 3. Replace the mock generateImage function with actual API calls
// 4. Add error handling and user feedback
