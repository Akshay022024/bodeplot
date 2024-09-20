function plotBode() {
    const numerator = document.getElementById('numerator').value.split(',').map(Number);
    const denominator = document.getElementById('denominator').value.split(',').map(Number);
  
    // Frequency range for the plot
    const w = [...Array(100).keys()].map(x => Math.pow(10, x / 20)); // Frequency range
  
    // Placeholder for Magnitude and Phase calculations (simplified for demonstration)
    const magnitude = w.map(freq => Math.abs(freq / 10)); // Dummy magnitude
    const phase = w.map(freq => Math.atan(freq)); // Dummy phase
  
    // Plot the traces
    const magTrace = {
        x: w,
        y: magnitude,
        type: 'scatter',
        name: 'Magnitude',
        yaxis: 'y1',
    };
  
    const phaseTrace = {
        x: w,
        y: phase,
        type: 'scatter',
        name: 'Phase',
        yaxis: 'y2',
    };
  
    const layout = {
      grid: { rows: 2, columns: 1, pattern: 'independent' },
      yaxis: { title: 'Magnitude (dB)', type: 'log' },
      yaxis2: { title: 'Phase (degrees)', overlaying: 'y', side: 'right' },
      xaxis: { title: 'Frequency (rad/s)', type: 'log' },
      height: window.innerWidth < 768 ? 400 : 500, // Adjust height based on screen width
      plot_bgcolor: '#1a1a1a',
      paper_bgcolor: '#1a1a1a',
      font: { color: '#fff' },
      autosize: true // Ensure the plot resizes with the container
  };
  
    Plotly.newPlot('plot', [magTrace, phaseTrace], layout);
  
    // Placeholder for gain crossover, phase crossover, gain margin, phase margin, and stability calculation
    let gainCrossoverFreq = 'Not found';
    let phaseCrossoverFreq = 'Not found';
    let gainMargin = 'Not found';
    let phaseMargin = 'Not found';
  
    // Check for Gain Crossover Frequency (where magnitude crosses 0 dB, i.e., 1 in linear scale)
    for (let i = 0; i < magnitude.length - 1; i++) {
        if (magnitude[i] <= 1 && magnitude[i + 1] > 1) {
            gainCrossoverFreq = w[i];
            break;
        }
    }
  
    // Check for Phase Crossover Frequency (where phase crosses -180 degrees, i.e., -Math.PI in radians)
    for (let i = 0; i < phase.length - 1; i++) {
        if (phase[i] <= -Math.PI && phase[i + 1] > -Math.PI) {
            phaseCrossoverFreq = w[i];
            break;
        }
    }
  
    // Calculate Gain Margin (1 / magnitude at phase crossover frequency)
    if (phaseCrossoverFreq !== 'Not found') {
        const index = w.indexOf(phaseCrossoverFreq);
        gainMargin = 1 / magnitude[index];
    }
  
    // Calculate Phase Margin (180 + phase at gain crossover frequency)
    if (gainCrossoverFreq !== 'Not found') {
        const index = w.indexOf(gainCrossoverFreq);
        phaseMargin = 180 + (phase[index] * (180 / Math.PI)); // Convert to degrees
    }
  
    // Determine system stability based on phase margin
    const stability = phaseMargin > 0 ? 'Stable' : 'Unstable';
  
    // Display the results
    document.getElementById('results').innerHTML = `
        <h2>Results:</h2>
        <p><strong>Gain Crossover Frequency:</strong> ${gainCrossoverFreq}</p>
        <p><strong>Phase Crossover Frequency:</strong> ${phaseCrossoverFreq}</p>
        <p><strong>Gain Margin:</strong> ${gainMargin}</p>
        <p><strong>Phase Margin:</strong> ${phaseMargin} degrees</p>
        <p><strong>System Stability:</strong> ${stability}</p>
    `;
  }
  function openContainer() {
    const container = document.getElementById('cont');
    // Check if the container exists and is hidden, then show it
    if (container && container.style.display === 'none') {
      container.style.display = 'block';
    }
  }
  
  //for code tab
  // script.js
function showCode(type) {
    // Hide both code contents
    document.getElementById('python-code').classList.remove('active');
    document.getElementById('js-code').classList.remove('active');

    // Remove 'active' class from both buttons
    document.getElementById('python-btn').classList.remove('active');
    document.getElementById('js-btn').classList.remove('active');

    // Show the selected code content
    if (type === 'python') {
        document.getElementById('python-code').classList.add('active');
        document.getElementById('python-btn').classList.add('active');
    } else if (type === 'js') {
        document.getElementById('js-code').classList.add('active');
        document.getElementById('js-btn').classList.add('active');
    }
}

// Show Python code by default
document.addEventListener('DOMContentLoaded', () => {
    showCode('js');
});


function openContactForm() {
    document.getElementById('contact-form').style.display = 'block';
  }

  function closeContactForm() {
    document.getElementById('contact-form').style.display = 'none';
  }

// search box 
  
  // Handle the toggle button click to show search results
  document.getElementById('toggle-btn').addEventListener('click', displaySearchResults);
  
  // Handle the Enter key to show search results
  document.getElementById('search-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      displaySearchResults();
    }
  });

