using KanbanApi.Models;
using KanbanApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace KanbanApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BoardsController : ControllerBase
{
    private readonly BoardService _boardService;

    public BoardsController(BoardService boardService)
    {
        _boardService = boardService;
    }

    [HttpGet]
    public async Task<List<Board>> Get() =>
        await _boardService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Board>> Get(string id)
    {
        var board = await _boardService.GetByIdAsync(id);

        if (board is null)
        {
            return NotFound();
        }

        return board;
    }

    [HttpPost]
    public async Task<IActionResult> Post(Board newBoard)
    {
        await _boardService.CreateAsync(newBoard);

        return CreatedAtAction(nameof(Get), new { id = newBoard.Id }, newBoard);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Board updatedBoard)
    {
        var board = await _boardService.GetByIdAsync(id);

        if (board is null)
        {
            return NotFound();
        }

        updatedBoard.Id = board.Id;

        await _boardService.UpdateAsync(id, updatedBoard);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var board = await _boardService.GetByIdAsync(id);

        if (board is null)
        {
            return NotFound();
        }

        await _boardService.RemoveAsync(id);

        return NoContent();
    }
}