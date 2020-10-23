import React, { useEffect, useState } from 'react';
import { Table, Grid, Card } from 'semantic-ui-react';
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
    <Grid.Column>
      <Card>
        <Card.Content>
          <Card.Header>Last Block Info</Card.Header>

          <Card.Description>
            <a href='https://github.com/Maar-io/polkadot-gitcoin-hack'>
              Maar.io github
            </a>
          </Card.Description>
        </Card.Content>
        <Card.Content>
            { blockInfo && blockInfo[0] ? blockInfo.map(info =>
                    <p key={info.name}>
                        <p>{info.name}</p>
                        <p>{info.value}</p>
                    </p>
                ) : <p/>
            }
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}