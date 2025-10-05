export const events = {
  ANALYSIS_COMPLETE: "analysis:complete",
};

const ApiService = {
  async fetchHistory() {
    // Simulate fetching data
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve([
            { title: "Shrimp Pond 1 - Normal", date: "2025-10-05 10:30 AM" },
            { title: "Shrimp Pond 2 - High Salinity", date: "2025-10-04 09:12 AM" },
          ]),
        1000
      )
    );
  },
};

export default ApiService;
