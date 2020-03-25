import * as React from 'react';
import { Progress } from './components/Progress';

export const App = () => {
    return <div>
         <h1>💖 Hello Todo !</h1>
         <Progress title="2020-03-19" beginText="00:00" endText="00:00" notes="13:34:24" progress={50}/>
    </div>
}