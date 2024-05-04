// components/Tabs.js
const Tabs = ({ activeIndex, onTabChange }) => {
    const tabs = ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"]; // Customize as needed

    return (
        <div style={{ display: 'flex', gap: '10px', padding: '10px 0' }}>
            {tabs.map((tab, index) => (
                <button 
                    key={index} 
                    onClick={() => onTabChange(index)}
                    style={{
                        padding: '10px 20px', 
                        cursor: 'pointer',
                        backgroundColor: index === activeIndex ? '#aaa' : '#ccc', // Highlight active tab
                    }}>
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default Tabs;
