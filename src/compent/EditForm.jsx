import { useState } from "react";
import "../App.css";

function EditForm({
  id,
  tittle: intTittle,
  author: intAuthor,
  content: intContent,
  handleCancelEdit,
  getAllArticles,
}) {
  const [tittle, setTittle] = useState(intTittle);
  const [content, setContent] = useState(intContent);
  const [author, setAuthor] = useState(intAuthor);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8080/artical", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          author: author,
          tittle: tittle,
          content: content,
        }),
      });

      const data = await response.json();

      if (data.isok) {
        alert("成功！" + data.message);
        handleCancelEdit();
        getAllArticles();
      } else {
        alert("失败: " + data.message);
      }
    } catch (error) {
      alert("错误: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          編輯文章 No.{id}
        </h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          作者
        </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          標題
        </label>
        <input
          type="text"
          value={tittle}
          onChange={(e) => setTittle(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          內容
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="6"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-between items-center pt-4">
        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              px-4 py-2 text-sm font-medium rounded-lg transition-colors
              ${
                isSubmitting
                  ? "bg-blue-400 text-white cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }
            `}
          >
            更改
          </button>
          <button
            type="button"
            onClick={handleCancelEdit}
            className="px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
        </div>
      </div>
    </form>
  );
}
export default EditForm;
