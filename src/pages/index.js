import React,{useState,useEffect,useContext} from 'react';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Nav from '../components/nav';
import Add from '../components/add';
import { MainContext } from '../App'

function Index(props) {
    const AppContext = useContext(MainContext);
    let { state:{list},dispatch } = AppContext;
    let [value,setvalue] = useState("");


    let addNewItem = () =>{
        let addon =  {
            title: "",
            content: "",
            addon:true,
            id:new Date().getTime()
        }
        list.unshift(addon);
        dispatch({
            type: 'update',
            payload: JSON.parse(JSON.stringify(list))
        }); 
    }
    
    useEffect(() => {
      

    });

    return (
        <div className="Container">
            <h2>React Hooks实现简单的记事本</h2>
            <TextField className='fullwidth' id="outlined-basic" label="搜索" variant="outlined" onChange={(e)=>{
               let val = e.target.value; 
               setvalue(val)
            }}/>

            <div className="contain">
                {
                    list.filter((item)=>{return item.addon || item.title.indexOf(value)!==-1 ||item.content.indexOf(value)!==-1}).map((item,i) => (
                        item.addon?
                        <Add key={i} item={item}></Add>:
                        <Nav key={i} item={item}></Nav>
                    ))
                }
            </div>



            <div>
                <ButtonBase
                    focusRipple
                    className="cardadd"
                    key={"start"}
                    onClick={addNewItem}
                >
                    <div className="bacimg" style={{ backgroundImage: "url(./images/topsearch.png)" }}>
                        <div className="flexcenter">
                            <AddIcon style={{ fontSize: 26 }}></AddIcon>
                            <p>
                                新增
                            </p>
                        </div>
                    </div>
                </ButtonBase>
            </div>

        </div>
    );
}

export default Index;