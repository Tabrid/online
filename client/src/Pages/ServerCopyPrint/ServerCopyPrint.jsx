import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { GridLoader } from "react-spinners";

const ServerCopyPrint = () => {
    const router = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch(`/api/apply/push?nid=${router.nid}&dob=${router.dob}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);

            });
    }, [router.nid, router.dob]);
    console.log(data.voter);
    const componentRef = useRef();

    const handleDownloadPDF = () => {
        const printableContent = componentRef.current.innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printableContent;

        window.print();

        document.body.innerHTML = originalContents;

    };

    const handlePrint = () => {
        handleDownloadPDF()

    };
    return (
        <div>
            {
                loading ? <div className="flex justify-center items-center "><GridLoader color="#36d7b7" /> </div> : <div className="w-7/12 min-h-screen" id="pdf-content" style={{}} ref={componentRef}>
                    <div className="flex flex-col justify-center items-center w-[1000px] ">
                        <img
                            alt="project"
                            src="https://i.ibb.co/wRm0QZG/image.png"
                            className=""
                            style={{ maxWidth: '100%', height: '150px' }}
                        />
                        <img
                            src={data?.data?.data?.photo}
                            alt=""
                            style={{
                                height: '120px',
                                width: '100px',
                                borderRadius: '10px',
                                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                                marginTop: '4px'
                            }}
                        />
                        <div className="w-[800px]">
                            <table style={{ borderCollapse: 'collapse', width: '70%', margin: 'auto', marginTop: '10px' }}>
                                <thead>
                                    <tr>
                                        <th className="" style={{ height: '3px', border: '1px solid lightblue', padding: '4px', backgroundColor: 'lightblue', width: '33.33%' }}>জাতীয় পরিচিতি তথ্য</th>
                                        <th style={{ border: '1px solid lightblue', backgroundColor: 'lightblue', padding: '4px' }}></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>জাতীয় পরিচয় পত্র নম্বর</td>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>{data?.data?.data?.nationalId}</td>

                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>পিন নম্বর</td>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>{data?.data?.data?.pin}</td>

                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>ভোটার নম্বর</td>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>{data?.voter?.voting_serial}</td>

                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>মোবাইল নম্বর</td>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>{data?.data?.data?.mobile}</td>

                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>ভোটার এলাকা</td>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>{data?.voter?.voterArea}</td>

                                    </tr>
                                </tbody>
                            </table>
                            <table style={{ borderCollapse: 'collapse', width: '70%', margin: 'auto' }}>
                                <thead>
                                    <tr>
                                        <th className="" style={{ border: '1px solid #ADD8E6', padding: '4px', backgroundColor: 'lightblue', width: '33.33%' }}>ব্যক্তিগত তথ্য</th>
                                        <th style={{ border: '1px solid #ADD8E6', backgroundColor: 'lightblue', padding: '4px' }}></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>নাম (বাংলা)</td>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>{data?.data?.data?.name}</td>

                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>নাম (ইংরেজী)</td>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>{data?.data?.data?.nameEn}</td>

                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>জন্ম তারিখ</td>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>{data?.data?.data?.dateOfBirth}</td>

                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>পিতার নাম</td>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>{data?.data?.data?.father}</td>

                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>মাতার নাম</td>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>{data?.data?.data?.mother}</td>

                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>স্বামী/স্ত্রীর নাম</td>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>{data?.data?.data?.spouse}</td>

                                    </tr>
                                </tbody>
                            </table>
                            <table style={{ borderCollapse: 'collapse', width: '70%', margin: 'auto' }}>
                                <thead>
                                    <tr>
                                        <th className="" style={{ border: '1px solid lightblue', padding: '4px', backgroundColor: 'lightblue', width: '33.33%' }}>অন্যান্য তথ্য</th>
                                        <th style={{ border: '1px solid lightblue', backgroundColor: 'lightblue', padding: '4px' }}></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>লিঙ্গ</td>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>{data?.data?.data?.gender}</td>

                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>ধর্ম</td>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>{data?.data?.data?.religion}</td>

                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>রক্তের গ্রুপ</td>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>{data?.data?.data?.bloodGroup}</td>

                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>জন্মস্থান</td>
                                        <td style={{ border: '1px solid #EEEEEE', padding: '4px' }}>{data?.data?.data?.birthPlace}</td>

                                    </tr>

                                </tbody>
                            </table>


                            <table style={{ borderCollapse: 'collapse', width: '70%', margin: 'auto' }}>
                                <thead>
                                    <tr>
                                        <th className="" style={{ border: '1px solid lightblue', backgroundColor: 'lightblue', width: '15%' }}>বর্তমান ঠিকানা</th>
                                        <th className="" style={{ border: '1px solid lightblue', backgroundColor: 'lightblue', width: '50%' }}></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="2" style={{ border: '1px solid #EEEEEE', padding: '4px', fontSize: '12px' }}>{data?.data?.data?.presentAddress}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <table style={{ borderCollapse: 'collapse', width: '70%', margin: 'auto' }}>
                                <thead>
                                    <tr>
                                        <th className="" style={{ border: '1px solid lightblue', backgroundColor: 'lightblue', width: '15%' }}>স্থায়ী ঠিকানা</th>
                                        <th className="" style={{ border: '1px solid lightblue', backgroundColor: 'lightblue', width: '50%' }}></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="2" style={{ border: '1px solid #EEEEEE', padding: '4px', fontSize: '12px' }}>{data?.data?.data?.permanentAddress}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <img src="https://i.ibb.co/g7ySxJp/image.png" alt="" style={{ marginTop: "5px", width: '700px' }} />
                    </div>


                    <style type="text/css" media="print">
                        {`
        @page {
            size: auto; 
            margin: 0;
        }

        body {
            background-color: #fff; /* Set background color for the body */
        }

        th {
            background-color: lightblue !important; /* Ensure background color for table headers */
        }

        

        /* Additional styles to retain background colors */
        * {
            -webkit-print-color-adjust: exact; /* Retain background colors */
        }

        /* Hide unnecessary elements for printing */
        h1, h2, h3, h4, h5, h6 {
            display: none;
        }
        time {
            display: none;
        }
    `}
                    </style>

                </div>
            }
            <div className="flex justify-center">
                <button className="btn" onClick={handlePrint} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Download PDF
                </button>
            </div>

        </div>
    );
};

export default ServerCopyPrint;