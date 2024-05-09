import { useEffect,useState } from "react"

const Tile = ({ flagUrl, name, altFlag }) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
          padding: "10px",
          border: "1px solid black",
          borderRadius: "8px",
          flexDirection: "column",
          width: "200px",
        }}
      >
        <img
          src={flagUrl}
          alt={altFlag}
          style={{ width: "100px", height: "100px" }}
        />
        <h2>{name}</h2>
      </div>
    );
  };
export default function Flag(){
  const [flag , setFlag] = useState();
  const fetchFlag = async () =>{
    const res = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await res.json();
    console.log(data)
    setFlag(data);
  }
  useEffect(() =>{
    fetchFlag();
  },[])
    return(
        <>
        <div>
            <h1>Flag</h1>
        </div>
        <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexWrap: "wrap",
        }}
      > 
     
        {flag.map((country) => (
          <Tile
            key={country.cca3}
            flagUrl={country.flags.png}
            name={country.name.common}
            altFlag={country.flags.alt}
          />
        ))}
      </div>
        </>
    )
}