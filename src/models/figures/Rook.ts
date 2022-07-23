import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import black from "../../assets/black-rook.png";
import white from "../../assets/white-rook.png";

export class Rook extends Figure{
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? black : white;
        this.name = FigureNames.ROOK;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false;
        }
        return this.cell.isEmptyVertical(target)
            || this.cell.isEmptyHorizontal(target);
    }

}
