import React, { useState, useContext } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import '../App.css';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { MainContext } from '../App';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

//互换元素位置
function swapArr(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
}

function Add(props) {
    const AppContext = useContext(MainContext);
    let { state: { list }, dispatch } = AppContext, { item, index } = props;
    let defaultitem = list.filter((item) => { return item.id === props.item.id });

    let [title, setTitle] = useState(defaultitem ? defaultitem[0].title : ""),
        [ctx, setCtx] = useState(defaultitem ? defaultitem[0].content : "");


    function submitForm(id) {
        let newlist = list.map((item, i) => {
            if (item.id === id) {
                return {
                    ...item,
                    title: title,
                    content: ctx,
                    addon: false
                }
            } else {
                return item
            }
        })
        dispatch({
            type: 'update',
            payload: JSON.parse(JSON.stringify(newlist))
        });
    };

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
                payload: swapArr(list, item.index, index)
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
            <div className='item' style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexDirection: "column" }}>
                <TextField value={title} onChange={(e) => {
                    setTitle(e.target.value)
                }} style={{ width: "100%" }} label="标题"></TextField>
                <TextField value={ctx} onChange={(e) => {
                    setCtx(e.target.value)
                }} style={{ width: "100%", marginTop: 24 }} label="内容"></TextField>
            </div>
            <div className='action'>
                <IconButton
                    aria-label="delete"
                    disabled={!title && !ctx}
                    onClick={() => { submitForm(item.id) }}>
                    <CheckIcon style={{ color: title && ctx ? "red" : "#999" }} />
                </IconButton>
                <div className='line'></div>
                <IconButton
                    aria-label="delete"
                    onClick={() => { toDelete(item.id) }}
                >
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default Add;
