import React from 'react';
import './Table.css';
const Table = ({ data, orderField, setOrderField, rowClick, order, scrollToDetails }) => {
    if (data.length === 0) return null;
    const triangleDesc="▼";
    const triangleAsc="▲";
    let orderSymbol= order > 0 ? triangleAsc : triangleDesc;
    return (<table>
        <thead>
            <tr>
                {
                    Object.keys(data[0]).map((keyName, i) => {
                        const nameData = keyName === 'name' ? 'MODELO' :
                            keyName === 'relevance' ? 'RELEVANCIA' :
                                keyName === 'price' ? 'PRECIO' : keyName;
                        if (keyName !== '_id') {
                            return (<th 
                                        onClick={() => setOrderField(keyName)} 
                                        key={i}
                                        className={keyName === "relevance" ? "classRelevance" :""}
                                        >{nameData} {orderField===keyName ? <span>{orderSymbol}</span> :""}
                                    </th>
                                    )
                        }
                    })
                }
            </tr>
        </thead>
        <tbody>
            {
                data.map((element, i) => {
                    return (
                        <tr key={"tr_" + i} onClick={() =>{
                            rowClick(element._id);
                        }}>
                            {
                                Object.keys(element).map((keyName, j) => {
                                    if (keyName !== '_id') {
                                        return <td className={keyName === "relevance" ? "classRelevance" :""} key={"td_" + i + "_" + j}>{element[keyName]}</td>
                                    }
                                }
                                )
                            }
                        </tr>
                    )
                })
            }
        </tbody>
    </table>);
};

export default Table;
