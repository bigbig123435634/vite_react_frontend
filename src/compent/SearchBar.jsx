import { useState } from "react";
import "../App.css";

function SearchBar({ setArticles, getAllArticles }) {
  const [search, setSearch] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!search.trim()) {
      // 如果搜索框為空，恢復顯示所有文章

      getAllArticles();

      return;
    }

    setArticles([]);

    try {
      const response = await fetch(`http://localhost:8080/artical/${search}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data.isok) {
        setSearch("");
        // 根据你的 AResponse 结构，文章在 data.data 中
        setArticles(data.data || []);
      } else {
        setSearch("");
        setArticles([]);
        alert("搜尋失敗: " + data.message);
      }
    } catch (error) {
      alert("搜尋錯誤:" + error);

      console.log("搜尋錯誤:" + error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-x-6"
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="在此搜尋"
        className=" basis-5/6 w-full rounded-lg px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
      />
      <button
        type="submit"
        className="basis-1/6 px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
      >
        搜尋
      </button>
    </form>
  );
}
export default SearchBar;
