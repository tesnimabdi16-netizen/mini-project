document.addEventListener('DOMContentLoaded', function() {
    
    
    const checkBudgetBtn = document.getElementById('checkBudgetBtn');
    const resultCard = document.getElementById('resultCard');
    const resultMessage = document.getElementById('resultMessage');
    const scoreBadge = document.getElementById('scoreBadge');

    
    checkBudgetBtn.addEventListener('click', function() {
        
        
        let score = 0;
        
      
        let budget = parseFloat(prompt("💰 What is your total budget? (in ETB)"));
        let itemPrice = parseFloat(prompt("🛍️ What is the price of the item you want to buy? (in ETB)"));
        let savings = parseFloat(prompt("💵 How much savings do you have? (optional, enter 0 if none)", "0"));
        
        
        if (isNaN(budget) || isNaN(itemPrice) || isNaN(savings)) {
            alert("❌ Please enter valid numbers!");
            return;
        }
        
        
        if (itemPrice <= budget) {
            score += 2;
        }
        
       
        if (itemPrice <= (budget + savings)) {
            score += 1;
        }
       
        if (itemPrice <= budget * 0.5) {
            score += 2;
        } else if (itemPrice <= budget * 0.8) {
            score += 1;
        }
        
      
        if (savings >= budget * 0.2) {
            score += 1;
        }
        
        let decision = "";
        let badgeClass = "";
        let emoji = "";
        
        if (score >= 5) {
            decision = "✅ YES! You can definitely afford this item! Great financial position!";
            badgeClass = "excellent";
            emoji = "🎉";
        } else if (score >= 3) {
            decision = "⚠️ You can afford it, but consider if it's a wise purchase right now.";
            badgeClass = "good";
            emoji = "💭";
        } else if (score >= 1) {
            decision = "❌ It might be better to wait and save more before buying this.";
            badgeClass = "fair";
            emoji = "⏳";
        } else {
            decision = "🚫 Sorry, you cannot afford this item right now. Focus on saving!";
            badgeClass = "poor";
            emoji = "💪";
        }
        
        
        let summary = `
            <strong>Budget:</strong> ${budget} ETB<br>
            <strong>Item Price:</strong> ${itemPrice} ETB<br>
            <strong>Savings:</strong> ${savings} ETB<br>
            <strong>Remaining after purchase:</strong> ${(budget + savings - itemPrice).toFixed(2)} ETB`;
        
       
        resultMessage.innerHTML = `${emoji} ${decision}<br><br>${summary}`;
        scoreBadge.textContent = `Financial Health Score: ${score}/6 ${getScoreEmoji(score)}`;
        
        if (score >= 5) {
            scoreBadge.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            scoreBadge.style.color = 'white';
        } else if (score >= 3) {
            scoreBadge.style.background = 'linear-gradient(135deg, #FFC107, #ffb300)';
            scoreBadge.style.color = 'white';
        } else {
            scoreBadge.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
            scoreBadge.style.color = 'white';
        }
        
        resultCard.style.display = 'block';
        
        
        console.log('💰 Budget Decision Tool Results:');
        console.log('Budget:', budget, 'ETB');
        console.log('Item Price:', itemPrice, 'ETB');
        console.log('Savings:', savings, 'ETB');
        console.log('Score:', score, '/6');
        console.log('Decision:', decision);
        console.log('------------------------');
        
       
        alert(`💰 Budget Check Complete!\n\nScore: ${score}/6\nCheck the page for details!`);
     });
    
   
    function getScoreEmoji(score) {
        if (score >= 5) return '🌟';
        if (score >= 3) return '👍';
        if (score >= 1) return '🤔';
        return '😢';
    }
});