document.addEventListener("DOMContentLoaded",function(){
	const player1Input=document.getElementById("player-1");
	const player2Input=document.getElementById("player-2");
	const submitButton=document.getElementById("submit");
	const messageDiv=document.querySelector(".message");
	const board=document.querySelector(".grid-container");
	const cells=document.querySelectorAll(".item");

	let player1,player2,currentPlayer,currentSymbol;
	let gameActive = false;
	let boardState=["","","","","","","","",""];

	submitButton.addEventListener("click",function(){
		player1=player1Input.value.trim();
		player2=player2Input.value.trim();
		if(player1 ==="" || player2===""){
			alert("enter both player name!");
		}
		gameActive=true;
		boardState=["","","","","","","","",""]
		cells.forEach(cell=>textContent="");
		currentPlayer=player1;
		currentSymbol="X";
		messageDiv.textContent=`${currentPlayer},you're up!`;
		board.style.pointerEvents="auto";
	});
	cells.forEach(cell =>{
		cell.addEventListener("click",function(){
			if(!gameActive || cell.textContent !== "" )return;

			const cellIndex = parseInt(cell.id)-1;
			boardState[cellIndex]=currentSymbol;
			cell.textContent=currentSymbol;

			if(checkwin()){
				messageDiv.textContent=`${currentPlayer} congratulation you won!`;
				gameActive=false;
				return;
			}
			if(boardState.every(cell=>cell !=="")){
				messageDiv.textContent="It's a draw!";
				gameActive=false;
				return;
			}
			currentPlayer=currentPlayer===player1?player2:player1;
			currentSymbol=currentSymbol==="X"?"O":"X";
			messageDiv.textContent=`${currentPlayer},you're up!`;
		});
	});
	function checkwin(){
		const winzone=[
			[0,1,2],[3,4,5],[6,7,8],//rows
			[0,3,6],[1,4,7],[2,5,8],//columns
			[0,4,8],[2,4,6]
		];
		return winzone.some(pattern=>{
			const [a,b,c]=pattern;
			return boardState[a] !=="" && boardState[a] === boardState[b] && boardState[a] === boardState[c];
			
		});
	}
});