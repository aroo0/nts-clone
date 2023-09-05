interface SelectedFiltersProps {}

const SelectedFilters: React.FC<SelectedFiltersProps> = ({}) => {
  return (
    <div className="bg-neutral-900 p-4">
      <p className="text-xs text-neutral-300">
        Select a mood, or multiple genres
      </p>
    </div>
  );
};

export default SelectedFilters;
