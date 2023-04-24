import React,{useState} from 'react'
interface FilteredStoreProps {
  allData: () => void;
  categories: {idcategory: number;
  name: string;}[];
  filterBycategory: (value: number) => void;
  setPrice: (value: number | null) => void;
  setMinPrice: (value: number | null) => void;
 
 
}
const FilterStore = ({
  allData,
  categories,
  filterBycategory,
  setPrice,
  setMinPrice,
 
  
}: FilteredStoreProps)=> {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  return (
    <div className="col-md-2" style={{ borderRight: "1px solid black" }}>
        <h3 className="text-blue-900 px-3 text-xl font-mono font-bold italic flex items-left">
          Categories
        </h3>
        <h6  className={`text-blue-600 font-bold cursor-pointer mb-2 ${
          selectedCategory === "" ? "text-red-500" : ""
        }`} onClick={allData}>All</h6>
        {categories.map((e, i) => (
          <h6
          className={`text-blue-600 font-bold cursor-pointer mb-2 ${
            selectedCategory === e.name ? "text-orange-500" : ""
          }`}
            key={i}
            onClick={() => {
              
              filterBycategory(e.idcategory)}}
          >
            {e.name}
          </h6>
        ))}
        <h3 className="text-blue-900 px-3 text-xl font-mono font-bold italic flex items-left">
          Filter By Price
        </h3>
        <div className="flex items-center mb-2">
        <input type="number" className="form-control" placeholder="minPrice" 
        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setMinPrice(Number(e.target.value))}/>
        </div>
        <div className="flex items-center mb-2">
        <input type="number" className="form-control" placeholder="maxPrice" 
        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPrice(Number(e.target.value))}/></div>
        
      </div>
  )
}

export default FilterStore