import React, {useState, useEffect} from 'react'
import "./Nav.css"
import { useNavigate } from 'react-router-dom';

export default function Nav() {

  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  //리액트 생명주기 hook 함수
  useEffect(()=> {
    //컴포넌트에 나타남
    window.addEventListener("scroll", ()=> {
      console.log(window.screenY)
      if(window.screenY > 50) {
        setShow(true);
      } else {
        setShow(false)
      }
    });

    //컴포넌트가 사라짐
    return () => {
      window.removeEventListener("scroll", ()=> {});
    };

  });

  const handelChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?p=${e.target.value}`);
  }

  return (
    <nav className={`nav ${show && 'nav__black'}`}>
        
        <img alt="rexflix logo"
        src="https://about.netflix.com/images/logo.png"
        className='nav__logo'
        onClick={()=>window.location.reload()}/>
        
        <input value={searchValue} onChange={handelChange} className='nav__input' type='text' placeholder='영화를 검색해 주세요.' ></input>

        <img alt="User logged" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAlK56I-yAT1YzyCD2hU5qDM7fROb0VR-uag&usqp=CAU" className='nav__avatar'/>
        
    </nav>
  )
}
