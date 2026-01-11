import { useState, useEffect } from "react";
import "../App.css";
import PostArtical from "../compent/PostArtical";
import DeleteBtn from "../compent/DeleteBtn";
import EditForm from "../compent/EditForm";
import SearchBar from "../compent/SearchBar";

function ArticleManagement() {
  const [articles, setArticles] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const getAllArticles = async () => {
    try {
      const response = await fetch("http://localhost:8080/artical", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      console.log("后端返回的数据:", data);

      if (data.isok) {
        setArticles(data.data || []);
      } else {
        alert("获取文章失败" + data.message);
      }
    } catch (err) {
      alert("无法连接到后端服务，请确保后端正在运行");
      console.error("获取文章失败:", error);
    }
  };

  useEffect(() => {
    getAllArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          文章管理系統
        </h1>

        <PostArtical getAllArticles={getAllArticles} />
        <SearchBar setArticles={setArticles} getAllArticles={getAllArticles} />

        {articles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">暫無文章</p>
          </div>
        ) : (
          <div className="space-y-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
              >
                {editingId === article.id ? (
                  <EditForm
                    id={article.id}
                    tittle={article.tittle}
                    author={article.author}
                    content={article.content}
                    getAllArticles={getAllArticles}
                    handleCancelEdit={handleCancelEdit}
                  />
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {article.tittle || "无标题"}
                      </h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(article.id)}
                          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                        >
                          編輯
                        </button>
                        <DeleteBtn
                          id={article.id}
                          getAllArticles={getAllArticles}
                        />
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">
                      <span className="font-medium">作者:</span>{" "}
                      {article.author || "未知"}
                    </p>
                    <div className="text-gray-700 mb-4 whitespace-pre-line">
                      {article.content || "无内容"}
                    </div>
                    <p className="text-gray-500 text-sm pt-4 border-t border-gray-100">
                      文章ID: {article.id}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default ArticleManagement;
