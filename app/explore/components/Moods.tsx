import { Mood } from "@/types/shows"

interface MoodsProps {
  moodList: Mood[]
  
}

const Moods: React.FC<MoodsProps> = ({moodList}) => {
  return (
    <div className="w-full grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 ">
      {moodList.map((mood) => (
        <ul>
          <li key={mood.id}>

          </li>
        </ul>
        
      ))}


       
    </div>
   )
}

export default Moods