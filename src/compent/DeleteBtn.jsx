import { useState } from "react";
import "../App.css";

function DeleteBtn({ id, getAllArticles }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`確定要刪除文章 ID: ${id} 嗎？此操作無法復原。`)) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`http://localhost:8080/artical/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.isok) {
        // 調用父組件的刷新函數
        if (getAllArticles && typeof getAllArticles === "function") {
          getAllArticles();
        }
        alert("刪除成功！" + data.message);
      } else {
        alert("刪除失敗: " + data.message);
      }
    } catch (error) {
      alert("錯誤: " + error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`
        px-3 py-1 text-sm rounded transition-colors
        ${
          isDeleting
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-red-500 text-white hover:bg-red-600"
        }
      `}
    >
      Delete
    </button>
  );
}
export default DeleteBtn;
