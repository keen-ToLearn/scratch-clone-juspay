export const checkLimit = (mouseX, mouseY, bounds) => {
    if(mouseX < bounds.least.x || mouseX > bounds.most.x)
        return false;
    if(mouseY < bounds.least.y || mouseY > bounds.most.y)
        return false;

    return true;
}