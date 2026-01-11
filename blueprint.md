# 준영이를 찾아라

## Overview

This project is a modified Minesweeper game called "준영이를 찾아라" (Find Junyoung). Instead of mines, the game uses an image uploaded by the user as the "mine". The goal is to find all the cells that do not contain the uploaded image.

## Features

*   **Game Board:** A grid of cells that can be clicked to reveal their contents.
*   **Custom "Mines":** The user can upload an image, which will be used as the "mine" in the game.
*   **Number Clues:** Cells that are not mines will show the number of adjacent mines.
*   **Flagging:** Players can right-click to place a flag on a cell they suspect is a mine.
*   **Game Over:** The game ends if a player clicks on a mine.
*   **Winning:** The player wins by revealing all the cells that are not mines.
*   **Reset:** A button to restart the game.
*   **Timer:** A timer to track the player's time.
*   **Mine Counter:** A counter to show the number of remaining mines.

## Design

*   **Layout:** The game will have a central game board with a header displaying the timer, mine counter, and reset button. An image upload button will be added to allow the user to select the "mine" image.
*   **Styling:** The game will have a clean and modern design, with clear visual cues for different cell states (hidden, revealed, flagged). When a mine is revealed, the uploaded image will be displayed in the cell.
*   **Responsiveness:** The game will be designed to be playable on different screen sizes.

## Implementation Plan

1.  **Update `blueprint.md`**: Reflect the new game title and the image upload feature.
2.  **Modify `index.html`**:
    *   Change the title of the game to "준영이를 찾아라".
    *   Add a file input element (`<input type="file">`) for image upload.
3.  **Modify `style.css`**: Add styles for the file input and modify the `.mine` class to display the image.
4.  **Modify `main.js`**:
    *   Implement the logic to get the uploaded image and use it as the mine image.
    *   Modify the `endGame` function to display the uploaded image in the mine cells.
5.  **Refine and test**: Thoroughly test the new features to ensure they work as expected.