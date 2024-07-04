import { MouseController } from '../controllers';

export const handleMouseEvents = (mouseController: MouseController) => {
  document.onmousedown = (event: MouseEvent) => {
    mouseController.keyPressed = true;
    mouseController.x = event.clientX;
    mouseController.y = event.clientY;
  };

  document.onmousemove = (event: MouseEvent) => {
    if (mouseController.keyPressed) {
      mouseController.x = event.clientX;
      mouseController.y = event.clientY;
    }
  };

  document.onmouseup = () => {
    mouseController.keyPressed = false;
  };

  document.oncontextmenu = () => {
    mouseController.keyPressed = false;
  };
};
