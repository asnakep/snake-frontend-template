// retryFetch.ts
export const retryFetch = async (url: string, options: RequestInit, retries = 3, delay = 1000): Promise<Response> => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          return response;
        }
      } catch (err) {
        if (i === retries - 1) {
          throw new Error("Maximum retry attempts reached");
        }
        await new Promise((res) => setTimeout(res, delay)); // Delay before retrying
      }
    }
    throw new Error("Failed to fetch after retries");
  };
  