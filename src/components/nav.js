import React, { useContext } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import '../App.css';
import IconButton from '@material-ui/core/IconButton';
import { MainContext } from '../App';

function Nav(props) {
    let { item } = props;
    const AppContext = useContext(MainContext);
    let { state: { list }, dispatch } = AppContext;

    function toEdit(id) {
        let newlist = list.map((item, i) => {
            if (item.id === id) {
                return {
                    ...item,
                    addon: true
                }
            } else {
                return item
            }
        })
        dispatch({
            type: 'update',
            payload: JSON.parse(JSON.stringify(newlist))
        });
    }

    function toDelete(id){
        dispatch({
            type: 'delete',
            payload: id
        });
    }

    return (
        <div className='items'>
            <div className='item'>
                <p>{item.title}</p>
                <p>{item.content}</p>
            </div>
            <div className='action'>
                <IconButton
                    aria-label="edit"
                    onClick={() => { toEdit(props.item.id) }}>
                    <EditIcon style={{ color: "lightblue" }} />
                </IconButton>
                <div className='line'></div>
                <IconButton
                    aria-label="delete"
                    onClick={() => { toDelete(props.item.id) }}
                >
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default Nav;
