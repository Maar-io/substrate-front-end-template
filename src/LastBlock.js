import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
import { useSubstrate } from './substrate-lib';

export default function Main (props) {
  const { api } = useSubstrate();
  const [blockInfo, fetchLastBlock] = useState({});

  useEffect(() => {
    let unsubscribeAll = null;

    api.rpc.chain.subscribeNewHeads((block) => {
      console.log(block);
      fetchLastBlock([
        { 
            name: 'number', 
            value: block.number.toNumber() 
        },
        { 
            name: 'hash', 
            value: block.hash.toHuman() 
        },
        { 
            name: 'parentHash', 
            value: block.parentHash.toHuman() 
        }]);
    });

    return () => unsubscribeAll && unsubscribeAll();
  }, [api, fetchLastBlock]);


  return (
    <>
      <h3>Last Block:</h3>
      <Table>
        <Table.Body>
          { blockInfo && blockInfo[0] ? blockInfo.map(info =>
                <Table.Row key={info.name}>
                <Table.Cell>{info.name}</Table.Cell>
                <Table.Cell>{info.value}</Table.Cell>
                </Table.Row>
            ) : <Table.Row/>
          }
        </Table.Body>
      </Table> 
    </>
  );
}