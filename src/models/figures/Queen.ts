import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import black from "../../assets/black-queen.png";
import white from "../../assets/white-queen.png";

export class Queen extends Figure{
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? black : white;
        this.name = FigureNames.QUEEN;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false;
        }
        return this.cell.isEmptyVertical(target)
            || this.cell.isEmptyHorizontal(target)
            || this.cell.isEmptyDiagonal(target);
    }
}
