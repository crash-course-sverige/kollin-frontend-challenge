
export default function PracticeLayout({ children }) {
    return (
        <>
            <div className="main-container">
                <h1 className='page-title'>Trigonometriska funktioner & identiteter</h1>
                <div className='page-container'>
                    {children}
                </div>
            </div>
        </>
    )
}