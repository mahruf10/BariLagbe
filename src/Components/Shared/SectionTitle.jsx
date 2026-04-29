import React from 'react';

const SectionTitle = ({heading,subheading}) => {
    return (
        <div className='md:w-4/18 my-10 mx-auto text-center '>
             <p className='text-orange-400'>---{subheading}---</p>
            <h2 className='uppercase border-y-2 text-xl p-2'>{heading}</h2>
            
        </div>
    );
};

export default SectionTitle;