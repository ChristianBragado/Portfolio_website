import React from 'react';
import printer from '../../assets/resume/printer.gif';
import Resume from '../../assets/resume/Christian_Bragado_Resume.pdf';

export interface ResumeDownloadProps {
    altText?: string;
}

const ResumeDownload: React.FC<ResumeDownloadProps> = ({ altText }) => {
    return (
        <section className="resume-download" aria-label="Resume download">
            <img className="resume-printer" alt="" src={printer} />
            <div>
                <p className="showcase-kicker">A printable version</p>
                <h2>{altText || 'Want the short version?'}</h2>
                <a className="resume-link" rel="noreferrer" target="_blank" href={Resume}>
                    Get my resume <span aria-hidden="true">↗</span>
                </a>
            </div>
        </section>
    );
};

export default ResumeDownload;
