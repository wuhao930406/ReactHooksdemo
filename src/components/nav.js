import React, { useContext } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import '../App.css';
import IconButton from '@material-ui/core/IconButton';
import { MainContext } from '../App';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

//互换元素位置
function swapArr(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
}

function Nav(props) {
    let { item, index } = props;
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
    function toDelete(id) {
        dispatch({
            type: 'delete',
            payload: id
        });
    }

    //拖拽逻辑

    const type = 'DragableBodyRow';
    const ref = React.useRef();
    const [{ isOver, dropClassName }, drop] = useDrop({
        accept: type,
        collect: monitor => {
            const { index: dragIndex } = monitor.getItem() || {};
            if (dragIndex === index) {
                return {};
            }
            return {
                isOver: monitor.isOver(),
                dropClassName: dragIndex < index ? 'moveitems' : 'moveitemc',
            };
        },
        drop: item => {
            //moveRow();
            console.log(item.index, index)
            dispatch({
                type: 'update',
                payload: swapArr(list,item.index,index)
            });
        },
    });
    const [{isDragging}, drag] = useDrag({
        item: { type, index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drop(drag(ref));

    return (
        <div 
            ref={ref}
            className={ `${isDragging?'itemz':''} ${isOver ? dropClassName : ''} ${'items'} `}
        >
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
