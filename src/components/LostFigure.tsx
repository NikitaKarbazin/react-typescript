import React, {FC} from 'react';
import {Figure} from "../models/figures/Figure";

interface LostFigureProps {
    title: string;
    figures: Figure[]
}

const LostFigure: FC<LostFigureProps> = ({title, figures}) => {
    return (
        <div className="lost">
            <h3 className="box--title">{title}</h3>
            {figures.map(figure => (
                <div key={figure.id} className="box--content">
                    {figure.name} {figure.logo && <img src={figure.logo} width={20} height={20} alt={figure.name}/>}
                </div>
            ))}
        </div>
    );
};

export default LostFigure;
