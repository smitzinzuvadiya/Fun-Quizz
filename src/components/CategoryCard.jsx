import { Link } from 'react-router-dom';

export function CategoryCard({ category }) {
  return (
    <Link
      to={`/quiz/${category.id}`}
      className="block w-full bg-surface rounded-[16px] p-5 shadow-sm hover:shadow-md transition-shadow active:scale-[0.98] active:shadow-sm"
    >
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-[12px] flex items-center justify-center text-3xl ${category.color}`}>
          {category.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-[18px] font-bold text-on-surface mb-1">{category.name}</h3>
          <p className="text-[14px] text-on-surface-variant font-medium">10 Questions</p>
        </div>
      </div>
    </Link>
  );
}
