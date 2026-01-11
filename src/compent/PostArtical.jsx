import { useState } from "react";
import "../App.css";

function PostArtical({ getAllArticles }) {
  const [tittle, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const clearall = () => {
    setTitle("");
    setContent("");
    setAuthor("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/artical", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, tittle, content }),
      });

      const data = await response.json();
      alert(data.isok ? "成功！" + data.message : "失败: " + data.message);

      if (data.isok) {
        clearall();
        getAllArticles();
      }
    } catch (error) {
      alert("错误: " + error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <div className="space-y-8">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-2">
          創建文章
        </h2>

        <div className="space-y-6 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="">
              <label className="block text-gray-700 mb-2 font-medium">
                作者名稱
              </label>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="作者名稱"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
              />
            </div>
            <div className="">
              <label className="block text-gray-700 mb-2 font-medium">
                標題
              </label>
              <input
                value={tittle}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="標題"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            文章內容
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="在這裡寫下您的文章內容..."
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors resize-y"
          />
        </div>
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
          <button
            type="submit"
            className="px-8 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
          >
            發布
          </button>
          <button
            type="button"
            onClick={clearall}
            className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            清空
          </button>
        </div>
      </div>
    </form>
  );
}

export default PostArtical;
