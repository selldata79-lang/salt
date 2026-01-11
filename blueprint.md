# 준영이를 찾아라

## Overview

This project is a modified Minesweeper game called "준영이를 찾아라" (Find Junyoung). Instead of mines, the game uses a character selected by the user as the "mine". The goal is to find all the cells that do not contain the selected character.

## Features

*   **Game Board:** A grid of cells that can be clicked to reveal their contents.
*   **Character Selection:** A selection of cute cartoon characters is available for the user to choose as the "mine" image.
*   **Number Clues:** Cells that are not mines will show the number of adjacent mines.
*   **Flagging:** Players can right-click to place a flag on a cell they suspect is a mine.
*   **Game Over:** The game ends if a player clicks on a mine, with a custom message.
*   **Winning:** The player wins by revealing all the cells that are not mines.
*   **Reset:** A button to restart the game.
*   **Timer:** A timer to track the player's time.
*   **Mine Counter:** A counter to show the number of remaining mines.

## Design

*   **Layout:** The game will have a central game board with a header displaying the timer, mine counter, and reset button. A character selection area will be at the bottom, displaying a variety of characters to choose from.
*   **Styling:** The game will have a clean and modern design. The selected character will be highlighted in the selection area. When a mine is revealed, the chosen character's image will be displayed in the cell.
*   **Responsiveness:** The game will be designed to be playable on different screen sizes.

## Implementation Plan

1.  **Update `blueprint.md`**: Reflect the new character selection feature.
2.  **Modify `index.html`**:
    *   Add a character selection section at the bottom of the page.
    *   Remove the file input for image upload.
3.  **Modify `style.css`**: Add styles for the character selection area and for highlighting the selected character.
4.  **Modify `main.js`**:
    *   Remove the file upload logic.
    *   Implement logic to handle character selection from the new section.
    *   Set the `mineImageURL` to the URL of the selected character's image.
5.  **Refine and test**: Thoroughly test the new character selection feature.
