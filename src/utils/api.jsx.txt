const api = {
  hostname: import.meta.env.VITE_API_BASE_URL,
  async getPermissions() {
    const response = await fetch(`${this.hostname}/Permissions`);
    return await response.json();
  },
  async deletePermissions(id) {
    const response = await fetch(`${this.hostname}/Permissions/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return response.text().then((message) => {
        throw new Error(`${message}`);
      });
    }
  },
  async postPermissions(values) {
    const response = await fetch(`${this.hostname}/Permissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return response.text().then((message) => {
        throw new Error(`${message}`);
      });
    }
  },

  async postXlsx(data) {
    const response = await fetch(`${this.hostname}/FileUpload`, {
      method: "POST",
      body: data,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return response.text().then((message) => {
        throw new Error(`${message}`);
      });
    }
  },
  async getDataManageSetting(role) {
    const response = await fetch(`${this.hostname}/DataManage/setting`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: role,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return response.text().then((message) => {
        throw new Error(`${message}`);
      });
    }
  },
  async getDataManageTableData(reqBody) {
    const response = await fetch(`${this.hostname}/DataManage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return response.text().then((message) => {
        throw new Error(`${message}`);
      });
    }
  },
  async getModelSetting(role) {
    const response = await fetch(`${this.hostname}/Model/setting`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: role,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return response.text().then((message) => {
        throw new Error(`${message}`);
      });
    }
  },
  async getModelTrainingTableData(reqBody) {
    const response = await fetch(`${this.hostname}/Model`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return response.text().then((message) => {
        throw new Error(`${message}`);
      });
    }
  },
  async postModelTraining(reqBody, id) {
    const response = await fetch(`${this.hostname}/Model/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return response.text().then((message) => {
        throw new Error(`${message}`);
      });
    }
  },
  async getModelResult(id) {
    const response = await fetch(`${this.hostname}/Model/${id}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return response.text().then((message) => {
        throw new Error(`${message}`);
      });
    }
  },
  async getModelManageTableData() {
    const response = await fetch(`${this.hostname}/ModelManage`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return response.text().then((message) => {
        throw new Error(`${message}`);
      });
    }
  },
  async getModelMCompareData(id) {
    const response = await fetch(`${this.hostname}/ModelManage/${id}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return response.text().then((message) => {
        throw new Error(`${message}`);
      });
    }
  },
};
export default api;
